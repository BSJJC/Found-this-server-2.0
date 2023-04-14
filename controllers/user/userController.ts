import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import {
  Db,
  GridFSBucket,
  GridFSBucketReadStream,
  MongoClient,
  ObjectId,
} from "mongodb";
import generateToken from "../../utils/generateToken";

import UserModel from "../../models/user/userModel";
import UserAvaterModel from "../../models/user/userAvatersModel";

/**
 * @description          Register new user
 * @route                     POST /api/user/signUp
 * @access                 Public
 */
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const exists = await UserModel.findOne({ email });
  if (exists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt: string = await bcrypt.genSalt(10);
  const hashedPassword: string = await bcrypt.hash(password, salt);

  const user = await UserModel.create({
    email,
    password: hashedPassword,
    avaterID: process.env.DEFAULT_USER_AVATER,
  });

  if (user) {
    res.status(200).json({
      _id: user.id,
      email: user.email,
      token: generateToken(user.id, 1, "d"),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * @description        Authenticate user
 * @router                 POST /api/user/login
 * @access               Public
 */
const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    // user exists
    // get avater
    let base64Data = "123";
    try {
      const client: MongoClient = await MongoClient.connect(
        process.env.MONGO_URI as string
      );

      const db: Db = client.db();
      const fileBucket: GridFSBucket = new GridFSBucket(db, {
        bucketName: "userAvaters",
      });

      const fileId: ObjectId = new ObjectId(user.avaterID);
      const downloadStream: GridFSBucketReadStream =
        fileBucket.openDownloadStream(fileId);

      let fileData = Buffer.from([]);

      downloadStream.on("data", (chunk) => {
        fileData = Buffer.concat([fileData, chunk]);
      });

      downloadStream.on("end", () => {
        base64Data = fileData.toString("base64");

        res.status(200).json({
          _id: user.id,
          email: user.email,
          avaterID: user.avaterID,
          avaterData: base64Data,
          token: generateToken(user.id, 1, "d"),
        });

        client.close();
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetch user avater");
    }
  } else {
    res.status(400).json({ reason: "Email or password wrong" });
    throw new Error("Invalid credentials");
  }
});

/**
 * @desc            Get administrator data
 * @route           GET /api/administrator/administratorData
 * @access        Public
 */
const getUserData = asyncHandler(async (req: Request, res: Response) => {
  //@ts-ignore
  const { email, password } = await UserModel.findById(
    req.body.administrator.id
  );

  res.status(200).json({
    email,
    password,
  });
});

export { registerUser, loginUser, getUserData };

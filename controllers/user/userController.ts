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
      email: user.email,
      userAvaterUrl: `http://localhost:5000/api/userAvaters/${user.avaterID}`,
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
    res.status(200).send({
      email: user.email,
      userAvaterUrl: user.avaterID,
    });
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

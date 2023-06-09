import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import UserAvaterModel from "../../models/user/userAvatersModel";

/**
 * @description          Upload new user avater
 * @route                     POST /api/userAvater/upload
 * @access                 Public
 */
const uploadUserAvater = asyncHandler(async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      throw new Error("Error uploading user avater");
    }

    const avater = new UserAvaterModel({
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      Base64String: req.file.buffer.toString("base64"),
    });

    const savedAvater = await avater.save();

    res.send(savedAvater._id);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error uploading user avater");
  }
});

/**
 * @desc            Get user avater
 * @route           GET /api/userAvater/get
 * @access        Public
 */
const getUserAvater = asyncHandler(async (req: Request, res: Response) => {
  try {
    const avater = await UserAvaterModel.findById(req.params.id);

    if (!avater) {
      res.status(404).send("Avater not found");
      return;
    }

    res.set("Content-Type", avater!.contentType.toString());
    res.send(Buffer.from(avater!.Base64String, "base64"));
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetch appendix");
  }
});

export { uploadUserAvater, getUserAvater };

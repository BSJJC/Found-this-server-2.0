import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import topicInfoModel from "../models/topicInfoModel";

const getTopicInfo = asyncHandler(async (req: Request, res: Response) => {});

const createTopicInfo = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { topicID, founder, title, text } = req.body;

    const topicInfo = await topicInfoModel.create({
      topicID,
      founder,
      title,
      text,
      isDeleted: false,
    });

    res.status(200).json(topicInfo);
  } catch (error) {
    res.status(400).send("error when create new topic");
    throw new Error("error when create new topic");
  }
});

export { createTopicInfo };

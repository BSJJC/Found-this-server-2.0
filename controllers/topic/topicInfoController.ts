import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import topicInfoModel from "../../models/topic/topicInfoModel";
import generateRandomTopicBd from "../../config/randomTopicBg";

/**
 * @description                     Get topic info
 * @route                                 GET /api/topic/info
 * @access                              Public
 */
const getTopicInfo = asyncHandler(async (req: Request, res: Response) => {});

/**
 * @description            Create new topic info
 * @route                       POST /api/topic/info
 * @access                    Public
 */
const createTopicInfo = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { founder, title, text, appendixIDs } = req.body;

    const topicInfo = await topicInfoModel.create({
      founder,
      title,
      text,
      appendixIDs,
      bgID: generateRandomTopicBd(),
      isDeleted: false,
    });

    res.status(200).json(topicInfo);
  } catch (error) {
    res.status(400).send("error when create new topic");
    throw new Error("error when create new topic");
  }
});

export { createTopicInfo };

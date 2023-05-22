import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import topicInfoModel from "../../models/topic/topicInfoModel";
import generateRandomTopicBd from "../../config/randomTopicBg";
import { ObjectId } from "mongodb";

/**
 * @description            Create new topic info
 * @route                       POST /api/topic/info
 * @access                    Public
 */
const createTopicInfo = asyncHandler(async (req: Request, res: Response) => {
  try {
    const {
      founder,
      founderName,
      founderAvaterID,
      title,
      text,
      appendixIDs,
    } = req.body;

    const topicInfo = await topicInfoModel.create({
      founder,
      founderName,
      founderAvaterID,
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

/**
 * @description                     Get topic info
 * @route                                 GET /api/topic/info/get/:id
 * @access                              Public
 */
const getTopicInfo = asyncHandler(async (req: Request, res: Response) => {
  const topics = await topicInfoModel.find().sort({ _id: 1 }).limit(6);

  res.status(200).send(topics);
});

/**
 * @description                     Like topic
 * @route                                 UPDATE /api/topic/info/like
 * @access                              Public
 */
const likeTopic = asyncHandler(async (req: Request, res: Response) => {
  const { topicID } = req.body;

  try {
    const topic = await topicInfoModel.findOneAndUpdate(
      { _id: new ObjectId(topicID) },
      { $inc: { likes: 1 } },
      { new: true }
    )

    if (!topic) {
      res.status(404).json({ error: 'Topic not found' });
      return
    }

    res.json({ message: 'Topic liked' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
})

/**
 * @description                     Dislike topic
 * @route                                 UPDATE /api/topic/info/dislike
 * @access                              Public
 */
const disLikeTopic = asyncHandler(async (req: Request, res: Response) => {
  const { topicID } = req.body;

  try {
    const topic = await topicInfoModel.findOneAndUpdate(
      { _id: new ObjectId(topicID) },
      { $inc: { likes: -1 } },
      { new: true }
    )

    if (!topic) {
      res.status(404).json({ error: 'Topic not found' });
      return
    }

    res.json({ message: 'Topic disliked' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
})

export { createTopicInfo, getTopicInfo, likeTopic, disLikeTopic };

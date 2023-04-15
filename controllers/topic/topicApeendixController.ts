import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import topicAppendixModel from "../../models/topic/topicAppendixModel";

/**
 * @description                             Upload new topic appendixs
 * @route                                         POST /api/topic/appendix
 * @access                                      Public
 */
const uploadTopicAppendix = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        throw new Error("Error uploading appendix");
      }

      const avater = new topicAppendixModel({
        filename: req.file.originalname,
        contentType: req.file.mimetype,
        imageBase64: req.file.buffer.toString("base64"),
      });

      const savedAvater = await avater.save();

      res.status(200).send(savedAvater._id);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error uploading appendix");
    }
  }
);

/**
 * @description                 Download topic appendixs
 * @route                            GET  /api/topic/appendix
 * @access                         Public
 */
const downloadTopicAppendix = asyncHandler(
  async (req: Request, res: Response) => {
    res.status(200).send("user appendixs downloaded");
  }
);

export { uploadTopicAppendix, downloadTopicAppendix };

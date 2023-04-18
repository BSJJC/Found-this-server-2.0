import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import topicBgModel from "../../models/topic/topicBgModel";

/**
 * @description                             Upload new topic background
 * @route                                         POST /api/topic/bg
 * @access                                      Public
 */
const uploadTopicBg = asyncHandler(async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      throw new Error("Error uploading topic background");
    }

    const bg = await topicBgModel.create({
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      Base64String: req.file.buffer.toString("base64"),
    });

    res.status(200).send(bg._id);
  } catch (err) {
    console.log(err);
    res.status(400).send("Internet error");
  }
});

/**
 * @description                 Download topic background
 * @route                            GET  /api/topic/bg
 * @access                         Public
 */
const downloadTopicBg = asyncHandler(async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const bg = await topicBgModel.findById(id);

    if (!bg) {
      res.status(404).send("Topic background not found");
      return;
    }

    res.set("Content-Type", bg!.contentType.toString());
    res.send(Buffer.from(bg!.Base64String, "base64"));
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetch topic background");
  }
});

export { uploadTopicBg, downloadTopicBg };

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
      // if (Math.random() > 0.5) {
      //   throw new Error("TEST");
      // }

      if (!req.file) {
        throw new Error("Error uploading appendix");
      }

      const appendix = await topicAppendixModel.create({
        filename: decodeURIComponent(req.file.originalname),
        extendName: decodeURIComponent(
          req.file.originalname.split(".").pop() as string
        ),
        contentType: req.file.mimetype,
        Base64String: req.file.buffer.toString("base64"),
      });

      res.status(200).send(appendix._id);
    } catch (err) {
      console.log(err);

      if (err instanceof Error) {
        res.status(500).send(`Error uploading appendix: ${err.message}`);
      } else {
        res.status(500).send("Error uploading appendix");
      }
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
    const id = req.params.id;

    const appendix = await topicAppendixModel.findById(id);

    if (!appendix) {
      res.status(404).send("Appendix not found");
      return;
    }

    res.set({ "Content-Type": appendix.contentType });
    res.send(appendix);
  }
);

export { uploadTopicAppendix, downloadTopicAppendix };

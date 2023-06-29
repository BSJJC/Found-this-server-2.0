import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import topicFileModel from "../../models/topic/topicFileModel";

/**
 * @description                             Upload new topic Files
 * @route                                         POST /api/topic/File
 * @access                                      Public
 */
const uploadTopicFile = asyncHandler(
  async (req: Request, res: Response) => {


    async function block(time: number): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, time));
    }

    // await block(2000)


    try {
      // if (Math.random() > 0.5) {
      //   throw new Error("TEST ERROR");
      // }

      if (!req.file) {
        throw new Error("Error uploading File");
      }

      const File = await topicFileModel.create({
        filename: decodeURIComponent(req.file.originalname),
        extendName: decodeURIComponent(
          req.file.originalname.split(".").pop() as string
        ),
        contentType: req.file.mimetype,
        Base64String: req.file.buffer.toString("base64"),
      });

      res.status(200).send(File._id);
    } catch (err) {
      console.log(err);

      if (err instanceof Error) {
        res.status(500).send(`Error uploading File: ${err.message}`);
      } else {
        res.status(500).send("Error uploading File");
      }
    }
  }
);

/**
 * @description                 Download topic Files
 * @route                            GET  /api/topic/File
 * @access                         Public
 */
const downloadTopicFile = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const File = await topicFileModel.findById(id);

    if (!File) {
      res.status(404).send("File not found");
      return;
    }

    res.set({ "Content-Type": File.contentType });
    res.send(File);
  }
);

export { uploadTopicFile, downloadTopicFile };

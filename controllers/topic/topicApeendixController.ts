import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  Db,
  GridFSBucket,
  GridFSBucketWriteStream,
  MongoClient,
} from "mongodb";
import topicAppendixModel from "../../models/topic/topicAppendixModel";

/**
 * @description                             Upload new topic appendixs
 * @route                                         POST /api/topic/appendix
 * @access                                      Public
 */
const uploadTopicAppendix = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const client: MongoClient = await MongoClient.connect(
        process.env.MONGO_URI as string
      );
      const db: Db = client.db();
      const fileBucket: GridFSBucket = new GridFSBucket(db, {
        bucketName: "topicAppendix",
      });

      console.log(req.file);

      res.send("OK");

      // const buffer: Buffer = files.buffer;

      // const uploadStream: GridFSBucketWriteStream = fileBucket.openUploadStream(
      //   files.originalname
      // );

      // uploadStream.end(buffer);

      // res.json({
      //   msg: "new avater upload done",
      //   id: uploadStream.id,
      // });

      client.close();
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

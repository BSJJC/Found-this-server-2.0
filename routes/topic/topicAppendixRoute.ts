import { Router } from "express";

import {
  uploadTopicAppendix,
  downloadTopicAppendix,
} from "../../controllers/topic/topicApeendixController";

import multer from "multer";

const upload = multer();
const topicAppendixRouter = Router();

topicAppendixRouter.post(
  "/upload",
  upload.single("userAppendix"),
  uploadTopicAppendix
);
topicAppendixRouter.get("/download/:id", downloadTopicAppendix);

export default topicAppendixRouter;

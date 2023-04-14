import { Router } from "express";

import {
  uploadTopicAppendix,
  downloadTopicAppendix,
} from "../../controllers/topic/topicApeendixController";

import multer from "multer";

const upload = multer();
const userTopicAppendixRouter = Router();

userTopicAppendixRouter.post(
  "/upload",
  upload.array("userAppendixs"),
  uploadTopicAppendix
);
userTopicAppendixRouter.get("/download/:id", downloadTopicAppendix);

export default userTopicAppendixRouter;

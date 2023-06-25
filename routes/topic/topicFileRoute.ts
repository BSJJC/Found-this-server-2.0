import { Router } from "express";

import {
  uploadTopicFile,
  downloadTopicFile,
} from "../../controllers/topic/topicFileController";
import multer from "multer";

const upload = multer();
const topicFileRouter = Router();

topicFileRouter.post(
  "/upload",
  upload.single("topicFile"),
  uploadTopicFile
);
topicFileRouter.get("/download/:id", downloadTopicFile);

export default topicFileRouter;

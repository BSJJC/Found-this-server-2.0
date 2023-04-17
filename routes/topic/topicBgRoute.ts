import { Router } from "express";

import {
  uploadTopicBg,
  downloadTopicBg,
} from "../../controllers/topic/topicBgController";
import multer from "multer";

const upload = multer();
const topicBgRouter = Router();

topicBgRouter.post("/upload", upload.single("topicBg"), uploadTopicBg);
topicBgRouter.get("/download/:id", downloadTopicBg);

export default topicBgRouter;

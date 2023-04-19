import { Router } from "express";
import {
  createTopicInfo,
  getTopicInfo,
} from "../../controllers/topic/topicInfoController";

const topicRouter = Router();

topicRouter.post("/create", createTopicInfo);
topicRouter.get("/get", getTopicInfo);

export default topicRouter;

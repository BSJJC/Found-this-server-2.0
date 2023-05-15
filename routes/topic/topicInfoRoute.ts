import { Router } from "express";
import {
  createTopicInfo,
  getTopicInfo,
  likeTopic
} from "../../controllers/topic/topicInfoController";

const topicRouter = Router();

topicRouter.post("/create", createTopicInfo);
topicRouter.get("/get", getTopicInfo);
topicRouter.post("/like", likeTopic)

export default topicRouter;

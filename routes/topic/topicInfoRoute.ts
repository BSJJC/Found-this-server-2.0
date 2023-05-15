import { Router } from "express";
import {
  createTopicInfo,
  getTopicInfo,
  likeTopic,
  disLikeTopic
} from "../../controllers/topic/topicInfoController";

const topicRouter = Router();

topicRouter.post("/create", createTopicInfo);
topicRouter.get("/get", getTopicInfo);
topicRouter.post("/like", likeTopic)
topicRouter.post("/dislike", disLikeTopic)

export default topicRouter;

import { Router } from "express";
import { createTopicInfo } from "../controllers/topicInfoController";

const topicRouter = Router();

topicRouter.post("/create", createTopicInfo);

export default topicRouter;

import { Router } from "express";
import {
  uploadUserAvater,
  getUserAvater,
} from "../../controllers/user/userAvaterController";
import multer from "multer";

const upload = multer();
const userTopicAppendixRouter = Router();

userTopicAppendixRouter.post(
  "/upload",
  upload.single("userAppendixs"),
  uploadUserAvater
);
userTopicAppendixRouter.get("/:id", getUserAvater);

export default userTopicAppendixRouter;

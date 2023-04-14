import { Schema, model } from "mongoose";

interface topicInfoModel {
  founder: string;
  title: string;
  text: string;
  isDeleted: boolean;
}

const topicInfoModelSchema = new Schema<topicInfoModel>({
});

const topicInfoModel = model<topicInfoModel>("topicInfo", topicInfoModelSchema);

export default topicInfoModel;

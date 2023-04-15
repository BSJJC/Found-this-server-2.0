import { Schema, model } from "mongoose";

interface topicInfoModel {
  founder: string;
  title: string;
  text: string;
  isDeleted: boolean;
}

const topicInfoModelSchema = new Schema<topicInfoModel>({
  founder: {
    type: String,
  },
  title: {
    type: String,
  },
  text: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
  },
});

const topicInfoModel = model<topicInfoModel>("TopicInfo", topicInfoModelSchema);

export default topicInfoModel;

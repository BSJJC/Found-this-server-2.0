import { Schema, model } from "mongoose";

interface topicInfoModel {
  founderName: string;
  founderAvaterID: string;
  title: string;
  text: string;
  bgID: string;
  fileIDs: string[],
  isDeleted: boolean;

  likes: number;
  dislikes: number;
  views: number;
}

const topicInfoModelSchema = new Schema<topicInfoModel>({
  founderName: {
    type: String,
  },
  founderAvaterID: {
    type: String,
  },
  title: {
    type: String,
  },
  text: {
    type: String,
  },
  bgID: {
    type: String,
  },
  fileIDs: {
    type: [String],
  },
  isDeleted: {
    type: Boolean,
  },
  likes: {
    default: 0,
    min: 0,
    type: Number
  },
  dislikes: {
    default: 0,
    min: 0,
    type: Number
  },
  views: {
    default: 0,
    min: 0,
    type: Number
  }
});

const topicInfoModel = model<topicInfoModel>("TopicInfo", topicInfoModelSchema);

export default topicInfoModel;

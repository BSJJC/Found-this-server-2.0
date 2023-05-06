import { Schema, model } from "mongoose";

interface topicInfoModel {
  founder: string;
  founderName: string;
  founderAvaterID: string;
  title: string;
  text: string;
  bgID: string;
  appendixIDs: Schema.Types.Array;
  isDeleted: boolean;
}

const topicInfoModelSchema = new Schema<topicInfoModel>({
  founder: {
    type: String,
  },
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
  appendixIDs: {
    type: [String],
  },
  isDeleted: {
    type: Boolean,
  },
});

const topicInfoModel = model<topicInfoModel>("TopicInfo", topicInfoModelSchema);

export default topicInfoModel;

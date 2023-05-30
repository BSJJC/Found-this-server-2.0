import { Schema, model } from "mongoose";

type repliesOfReply = {
  userID: string,
  userAvaterID: string,
  date: Date,
  replyText: string,
  likes: number,
  dislikes: number,
}


type replyType = {
  userID: string,
  userAvaterID: string,
  date: Date,
  replyText: string,
  likes: number,
  dislikes: number,
  repliesOfReply: Array<repliesOfReply>
}

interface topicInfoModel {
  founder: string;
  founderName: string;
  founderAvaterID: string;
  title: string;
  text: string;
  bgID: string;
  appendixIDs: Schema.Types.Array;
  isDeleted: boolean;

  likes: number;
  dislikes: number;
  views: number;
  replies?: Array<replyType>
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
  },
  replies: {
    type: Number,
    default: 0,
    min: 0
  }
});

const topicInfoModel = model<topicInfoModel>("TopicInfo", topicInfoModelSchema);

export default topicInfoModel;

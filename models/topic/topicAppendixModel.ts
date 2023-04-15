import { Schema, model } from "mongoose";

interface topicAppendixModel {
  filename: String;
  originalname: String;
  mimetype: String;
}

const topicAppendixModelSchema = new Schema<topicAppendixModel>({
  filename: {
    type: String,
  },
  originalname: {
    type: String,
  },
  mimetype: {
    type: String,
  },
});

const topicAppendixModel = model<topicAppendixModel>(
  "topicAppendix",
  topicAppendixModelSchema
);

export default topicAppendixModel;

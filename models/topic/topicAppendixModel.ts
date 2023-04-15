import { Schema, model } from "mongoose";

interface topicAppendix {}

const topicAppendixModelSchema = new Schema<topicAppendix>();

const topicAppendixModel = model<topicAppendix>(
  "TopicAppendix",
  topicAppendixModelSchema
);

export default topicAppendixModel;

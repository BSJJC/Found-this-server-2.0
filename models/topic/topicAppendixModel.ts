import { Schema, model } from "mongoose";

interface topicAppendix {
  filename: String;
  contentType: String;
  extendName: String;
  imageBase64: String;
}

const topicAppendixModelSchema = new Schema<topicAppendix>({
  filename: {
    type: String,
  },
  contentType: {
    type: String,
  },
  extendName: {
    type: String,
  },
  imageBase64: {
    type: String,
  },
});

const topicAppendixModel = model<topicAppendix>(
  "TopicAppendix",
  topicAppendixModelSchema
);

export default topicAppendixModel;

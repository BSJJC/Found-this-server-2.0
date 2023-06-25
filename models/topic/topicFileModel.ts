import { Schema, model } from "mongoose";

interface topicFile {
  filename: String;
  contentType: String;
  extendName: String;
  imageBase64: String;
}

const topicFileModelSchema = new Schema<topicFile>({
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

const topicFileModel = model<topicFile>(
  "TopicFile",
  topicFileModelSchema
);

export default topicFileModel;

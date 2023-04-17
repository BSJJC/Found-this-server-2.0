import { Schema, model } from "mongoose";

interface topicBg {
  filename: String;
  contentType: String;
  imageBase64: String;
}

const topicBgModelSchema = new Schema<topicBg>({
  filename: {
    type: String,
  },
  contentType: {
    type: String,
  },
  imageBase64: {
    type: String,
  },
});

const topicBgModel = model<topicBg>("TopicBg", topicBgModelSchema);

export default topicBgModel;

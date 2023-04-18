import { Schema, model } from "mongoose";

interface topicBg {
  filename: String;
  contentType: String;
  Base64String: String;
}

const topicBgModelSchema = new Schema<topicBg>({
  filename: {
    type: String,
  },
  contentType: {
    type: String,
  },
  Base64String: {
    type: String,
  },
});

const topicBgModel = model<topicBg>("TopicBg", topicBgModelSchema);

export default topicBgModel;

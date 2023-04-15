import { Schema, model } from "mongoose";

interface UserAvater {
  filename: String;
  contentType: String;
  imageBase64: String;
}

const UserAvaterSchema = new Schema<UserAvater>({
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

const UserAvaterModel = model<UserAvater>("UserAvaters", UserAvaterSchema);

export default UserAvaterModel;

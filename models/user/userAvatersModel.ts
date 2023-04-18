import { Schema, model } from "mongoose";

interface UserAvater {
  filename: String;
  contentType: String;
  Base64String: String;
}

const UserAvaterSchema = new Schema<UserAvater>({
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

const UserAvaterModel = model<UserAvater>("UserAvaters", UserAvaterSchema);

export default UserAvaterModel;

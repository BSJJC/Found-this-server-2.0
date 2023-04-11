import { Schema, model } from "mongoose";

interface User {
  email: string;
  password: string;
  avaterID: string;
  ppp: string;
}

const UserSchema = new Schema<User>({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  avaterID: {
    type: String,
  },
  ppp: {
    type: String,
  },
});

const UserModel = model<User>("User", UserSchema);

export default UserModel;

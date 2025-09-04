import { UserType } from "@/types/user.type";
import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    role: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = model<UserType>("User", userSchema);

export default UserModel;

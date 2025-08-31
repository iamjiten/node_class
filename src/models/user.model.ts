import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = model("User", userSchema);

export default UserModel;

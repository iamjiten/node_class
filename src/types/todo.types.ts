import { Document } from "mongoose";
import { UserType } from "./user.type";

export interface TodoType extends Document {
  title: string;
  status: boolean;
  user: UserType;
  createdAt: Date;
  updatedAt: Date;
}

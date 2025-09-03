import { Document } from "mongoose";

export interface TodoType extends Document {
  title: string;
  status: boolean;
  user: string;
  createdAt: Date;
  updatedAt: Date;
}

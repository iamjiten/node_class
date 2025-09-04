import { Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  price: number;
  discount?: number;
  stock: number;
  descripton: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

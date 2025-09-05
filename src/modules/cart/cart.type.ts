import { UserType } from "@/types/user.type";
import { Document } from "mongoose";
import { IProduct } from "@/modules/product/product.type";

export interface ICart extends Document {
  user: UserType;
  product: IProduct;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

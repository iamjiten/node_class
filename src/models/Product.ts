import { IProduct } from "@/modules/product/product.type";
import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: String,
    price: Number,
    discount: {
      type: Number,
      default: 0,
    },
    stock: Number,
    descripton: String,
    status: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product = model<IProduct>("Product", productSchema);
export default Product;

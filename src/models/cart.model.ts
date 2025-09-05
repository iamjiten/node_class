import { ICart } from "@/modules/cart/cart.type";
import { model, Schema } from "mongoose";

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      requried: true,
      ref: "User",
    },
    product: {
      type: Schema.Types.ObjectId,
      requried: true,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Cart = model<ICart>("Cart", cartSchema);
export default Cart;

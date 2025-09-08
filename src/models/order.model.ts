import { IOrder } from "@/modules/order/order.type";
import { OrderItemStatus, OrderStatus } from "@/types/order.enum";
import { model, Schema } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      reuired: true,
    },
    total_amount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: OrderStatus,
      default: OrderStatus.PENDING,
    },
    order_items: [
      {
        product_id: String,
        product_name: String,
        product_price: Number,
        quentity: Number,
        staus: {
          type: String,
          enum: OrderItemStatus,
          default: OrderItemStatus.PENDING,
        },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const Order = model<IOrder>("Order", orderSchema);

export default Order;

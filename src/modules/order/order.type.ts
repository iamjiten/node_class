import { OrderItemStatus, OrderStatus } from "@/types/order.enum";
import { UserType } from "@/types/user.type";
import { Document } from "mongoose";

export interface IOrder extends Document {
  user: UserType;
  total_amount: number;
  status: OrderStatus;
  order_items: Array<IOrderItem>;
  // order_items: IOrderItem[];
  // order_items: [IOrderItem];
  createAt: Date;
  upatedAt: Date;
}

export interface IOrderItem {
  product_id: string;
  product_name: string;
  product_price: number;
  quentity: number;
  staus: OrderItemStatus;
}

export interface ICreateOrder {
  user: string;
  total_amount: number;
  status: OrderStatus;
  order_items: Array<IOrderItem>;
}

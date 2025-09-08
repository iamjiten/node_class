import Order from "@/models/order.model";
import { ICreateOrder } from "./order.type";
import { NotFoundException } from "@/exceptions";
import { OrderItemStatus, OrderStatus } from "@/types/order.enum";

export const placeOrder = (userId: string, orderData: ICreateOrder) => {
  return Order.create({ user: userId, ...orderData });
};

export const getAllOrders = () => {
  return Order.find().populate("user");
};

export const getOrderById = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order) throw new NotFoundException("Order Not Found");
  return order;
};

export const updateOrder = async (orderId: string, status: OrderStatus) => {
  const order = await getOrderById(orderId);
  order.status = status;
  await order.save();
  return order;
};

export const updateOrderItem = async (data: {
  orderId: string;
  productId: string;
  status: OrderItemStatus;
}) => {
  const { orderId, productId, status } = data;
  const order = await getOrderById(orderId);
  const orderItems = order.order_items?.map((order_item) => {
    if (order_item.product_id == productId) {
      order_item.staus = status;
    }
    return order_item;
  });
  order.order_items = orderItems;
  await order.save();
  return order;
};

export const getAllOrdersByUser = (userId: string) => {
  return Order.find({ user: userId });
};

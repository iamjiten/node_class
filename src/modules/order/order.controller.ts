import { Request, Response } from "express";
// import { getCarts } from "@/modules/cart/cart.service";
import Cart from "@/models/cart.model";
import { ICreateOrder, IOrderItem } from "./order.type";
import { OrderItemStatus, OrderStatus } from "@/types/order.enum";
import {
  getAllOrders,
  getAllOrdersByUser,
  getOrderById,
  placeOrder,
  updateOrder,
  updateOrderItem,
} from "./order.service";
import { CREATED, OK } from "@/constants/http_status";
import { clearCart } from "@/modules/cart/cart.service";

export const placeOrderHandler = async (req: Request, res: Response) => {
  const userId = req.user._id!;
  const cart = await Cart.find({ user: userId }).populate("product");
  let total = 0;
  const products: IOrderItem[] = cart.map((cart_item) => {
    total += cart_item.quantity * cart_item.product.price;
    return {
      product_id: `${cart_item.product._id}`,
      product_name: cart_item.product.name,
      product_price: cart_item.product.price,
      quentity: cart_item.quantity,
      staus: OrderItemStatus.PENDING,
    };
  });
  const orderData: ICreateOrder = {
    user: `${userId}`,
    total_amount: total,
    status: OrderStatus.PENDING,
    order_items: products,
  };

  const order = await placeOrder(`${userId}`, orderData);
  await clearCart(`${userId}`);

  return res.status(CREATED).json({ status: "success", order });
};

export const getAllOrdersHandler = async (req: Request, res: Response) => {
  const orders = await getAllOrders();
  return res.status(OK).json({
    success: true,
    orders,
  });
};

export const getOrderByIdHandler = async (req: Request, res: Response) => {
  const order = await getOrderById(req.params.orderId);
  return res.status(OK).json({
    success: true,
    order,
  });
};

export const updateOrderHandler = async (req: Request, res: Response) => {
  const order = await updateOrder(req.params.orderId, req.body.status);
  return res.status(OK).json({
    success: true,
    order,
  });
};

export const updateOrderItemHandler = async (req: Request, res: Response) => {
  const order = await updateOrderItem({
    orderId: req.params.orderId,
    productId: req.params.productId,
    status: req.body.status,
  });
  return res.status(OK).json({
    success: true,
    order,
  });
};

export const getAllOrdersByUserHandler = async (
  req: Request,
  res: Response
) => {
  const orders = await getAllOrdersByUser(`${req.user._id}`);
  return res.status(OK).json({
    success: true,
    orders,
  });
};

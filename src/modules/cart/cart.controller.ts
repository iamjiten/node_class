import { Request, Response } from "express";
import {
  addToCart,
  clearCart,
  findCartById,
  getCarts,
  removeFromCart,
  updateQuantity,
} from "./cart.service";
import { CREATED, OK } from "@/constants/http_status";
import { ForbiddenException, NotFoundException } from "@/exceptions";

export const getCartsHandler = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const carts = await getCarts(userId?.toString());
  res.status(OK).json({
    message: "List of Cart Items",
    success: true,
    statusCode: 200,
    data: carts,
  });
};

export const addToCartHandler = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const body = req.body;
  const cart = await addToCart(userId?.toString(), body);
  res.status(CREATED).json({
    message: "Product added to cart",
    success: true,
    statusCode: 200,
    data: cart,
  });
};

export const updateQuantityHandler = async (req: Request, res: Response) => {
  const cartId = req.params.id.toString();
  const userId = req.user._id?.toString();
  const body = req.body;

  const cart = await findCartById(cartId);
  if (!cart) throw new NotFoundException("Cart Not Found");

  if (cart.user.toString() != userId)
    throw new ForbiddenException("Permission denied");

  const updatedCart = await updateQuantity(cartId, body);
  res.status(CREATED).json({
    message: "Cart item quantity updted",
    success: true,
    statusCode: 200,
    data: { cart: updatedCart },
  });
};

export const removeFromCartHandler = async (req: Request, res: Response) => {
  const cartId = req.params.id.toString();
  const userId = req.user._id?.toString();

  const cart = await findCartById(cartId);
  if (!cart) throw new NotFoundException("Cart Not Found");

  if (cart.user.toString() != userId)
    throw new ForbiddenException("Permission denied");
  await removeFromCart(cartId);

  res.status(CREATED).json({
    message: "Cart item removed",
    success: true,
    statusCode: 200,
  });
};

export const clearCartHandler = async (req: Request, res: Response) => {
  const userId = req.user._id?.toString();
  await clearCart(userId);
  res.status(CREATED).json({
    message: "Cart cleared",
    success: true,
    statusCode: 200,
  });
};

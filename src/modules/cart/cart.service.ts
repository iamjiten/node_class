import Cart from "@/models/cart.model";
import { addToCartType, updateQtyType } from "@/validations/cart.validation";

export const getCarts = async (userId: string) => {
  const cart = await Cart.find({ user: userId }).populate("product");
  return cart;
};

export const addToCart = async (userId: string, data: addToCartType) =>
  Cart.create({ user: userId, ...data });

export const updateQuantity = async (cartId: string, data: updateQtyType) =>
  Cart.findByIdAndUpdate(cartId, data, {
    new: true,
  });

export const removeFromCart = async (cartId: string) =>
  Cart.findByIdAndDelete(cartId);

export const clearCart = async (userId: string) =>
  Cart.deleteMany({ user: userId });

export const findCartById = async (cartId: string) => Cart.findById(cartId);

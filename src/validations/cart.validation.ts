import * as z from "zod";

export const addToCartValidation = z.object({
  product: z.string().nonempty("Product is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
});

export const updateQuantityValidation = z.object({
  quantity: z.number().min(1, "Quantity must be at least 1"),
});

export type addToCartType = z.infer<typeof addToCartValidation>;
export type updateQtyType = z.infer<typeof updateQuantityValidation>;

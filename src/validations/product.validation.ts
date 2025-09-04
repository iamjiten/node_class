import * as z from "zod";

export const createProduct = z.object({
  name: z
    .string({ message: "Title is required" })
    .nonempty("Title is required 1")
    .min(3, { message: "Title must be atleast 3 character" }),
  slug: z.string().nonempty("Slug is required"),
  price: z
    .number()
    .nonnegative("Price must be in +ve")
    .min(1, "Price must be at least 1"),
  discount: z.number().nonnegative("Discount must be +ve").optional(),
  stock: z
    .number()
    .nonnegative("Stock must be in +ve")
    .min(1, "Stock must be at least 1"),
  descripton: z.string().nonempty("Description is required"),
  status: z.boolean(),
});

export type createProductType = z.infer<typeof createProduct>;

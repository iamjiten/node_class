import { FilterQuery } from "mongoose";
import { IProduct } from "./product.type";
import Product from "@/models/Product";
import { PER_PAGE } from "@/constants/helper";
import { createProductType } from "@/validations/product.validation";
import { OK } from "@/constants/http_status";
import { NotFoundException } from "@/exceptions";

export const getProducts = async (
  query: FilterQuery<IProduct>,
  paginationData?: { per_page: number; page: number }
) => {
  const { per_page, page } = paginationData;
  let currentPage = page ?? 1;
  let limit = per_page ?? PER_PAGE;
  const skip = (currentPage - 1) * limit;
  const [count, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query).limit(limit).skip(skip).sort("-createdAt"),
  ]);

  const pagination = {
    page: currentPage,
    per_page,
    total: count,
    total_page: Math.ceil(count / per_page),
  };
  return { pagination, products };
};
export const createProduct = async (
  data: createProductType
): Promise<IProduct> => {
  const todo = Product.create(data);
  return todo;
};
export const updateProduct = async (
  productId: string,
  data: createProductType
) => {
  const updatedTodo = await Product.findByIdAndUpdate(productId, data, {
    new: true,
  });
  return {
    success: true,
    message: "Todo updated",
    statusCode: OK,
    data: { product: updatedTodo },
  };
};
export const deleteProduct = async (productId: string) => {
  const deletedProduct = await Product.findByIdAndDelete(productId);
  if (!deletedProduct) throw new NotFoundException("Product not found");

  return {
    success: true,
    message: "Product deleted",
    statusCode: OK,
  };
};

export const getProductBySlug = async (slug: string) => {
  const product = await Product.findOne({ slug });
  if (!product) throw new NotFoundException("Product not found");
  return product;
};

export const getProductById = async (productId: string) => {
  const product = await Product.findById(productId);
  if (!product) throw new NotFoundException("Product not found");
  return product;
};

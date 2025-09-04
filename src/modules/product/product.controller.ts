import { Request, Response } from "express";
import { FilterQuery } from "mongoose";
import { IProduct } from "./product.type";
import { createProduct, getProducts } from "./product.service";
import { CREATED, OK } from "@/constants/http_status";

export const getProductsHandler = async (req: Request, res: Response) => {
  const { status, q, per_page, page } = req.query;
  const query: FilterQuery<IProduct> = {};

  if (status) query.status = status;
  if (q) {
    query.title = { $regex: q, $options: "i" };
  }

  let paginationData: { per_page: number; page: number } = {
    per_page: 1,
    page: 1,
  };
  if (per_page) paginationData.per_page = Number(per_page);
  if (page) paginationData.page = Number(page);

  const products = await getProducts(query, paginationData);
  res.status(OK).json({
    message: "List of Product",
    success: true,
    statusCode: 200,
    data: products,
    query,
  });
};

export const createProductHandler = async (req: Request, res: Response) => {
  const product = await createProduct(req.body);

  res.status(CREATED).json({
    message: "Product created",
    success: true,
    statusCode: 201,
    data: { product },
  });
};

export const updateProductHandler = (req: Request, res: Response) => {};
export const deleteProductHandler = (req: Request, res: Response) => {};
export const getProductBySlugHandler = (req: Request, res: Response) => {};
export const getProductByIdHandler = (req: Request, res: Response) => {};

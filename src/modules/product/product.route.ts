import { Router } from "express";
import {
  createProductHandler,
  deleteProductHandler,
  getProductByIdHandler,
  getProductBySlugHandler,
  getProductsHandler,
  updateProductHandler,
} from "./product.controller";
import { checkAuth } from "@/midlewares";

const router = Router();

router.get("/", getProductsHandler);
router.get("/:slug", getProductBySlugHandler);
router.post("/", checkAuth, createProductHandler);
router.get("/:id/view", getProductByIdHandler);
router.patch("/:id", checkAuth, updateProductHandler);
router.delete("/:id", checkAuth, deleteProductHandler);

export default router;

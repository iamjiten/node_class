import { Router } from "express";
import {
  addToCartHandler,
  clearCartHandler,
  getCartsHandler,
  removeFromCartHandler,
  updateQuantityHandler,
} from "./cart.controller";
import { validate } from "@/midlewares";
import {
  addToCartValidation,
  updateQuantityValidation,
} from "@/validations/cart.validation";

const router = Router();

router.get("/", getCartsHandler);
router.post("/", validate(addToCartValidation), addToCartHandler);
router.patch("/:id", validate(updateQuantityValidation), updateQuantityHandler);
router.delete("/:id", removeFromCartHandler);
router.delete("/", clearCartHandler);

export default router;

import { Router } from "express";
import {
  getAllOrdersByUserHandler,
  getAllOrdersHandler,
  getOrderByIdHandler,
  placeOrderHandler,
  updateOrderHandler,
  updateOrderItemHandler,
} from "./order.controller";
import { checkRoles } from "@/midlewares/checkRoles";
import { UserRole } from "@/types/user.type";

const router = Router();

router.post("", placeOrderHandler);
router.get("", getAllOrdersHandler);
router.get(
  "/user_orders",
  checkRoles(UserRole.USER, UserRole.ADMIN),
  getAllOrdersByUserHandler
);
router.get("/:orderId", getOrderByIdHandler);
router.patch("/:orderId", checkRoles(UserRole.ADMIN), updateOrderHandler);
router.patch(
  "/:orderId/:productId",
  checkRoles(UserRole.ADMIN),
  updateOrderItemHandler
);

export default router;

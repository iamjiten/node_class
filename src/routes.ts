import { Request, Response, Router } from "express";
import todoRoutes from "./modules/todo/todo.routes";
import userRoutes from "./modules/user/user.route";
import authRoutes from "./modules/auth/auth.route";
import { NOT_FOUND } from "./constants/http_status";
import { checkAuth } from "./midlewares/auth.middleware";
import productRoutes from "./modules/product/product.route";
import cartRoutes from "./modules/cart/cart.route";
import orderRoutes from "./modules/order/order.route";

const router = Router();
router.use("/todo", checkAuth, todoRoutes);
router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/product", productRoutes);
router.use("/cart", checkAuth, cartRoutes);
router.use("/order", checkAuth, orderRoutes);

router.all("/{*any}", (req: Request, res: Response) => {
  return res
    .status(NOT_FOUND)
    .json({ data: { success: false, message: "Routes not found" } });
});

export default router;

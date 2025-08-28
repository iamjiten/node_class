import { Router } from "express";
import todoRoutes from "./modules/todo/todo.routes";
import userRoutes from "./modules/user/user.route";
import authRoutes from "./modules/auth/auth.route";

const router = Router();
router.use("/todo", todoRoutes);
router.use("/user", userRoutes);
router.use("/auth", authRoutes);

export default router;

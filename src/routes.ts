import { Request, Response, Router } from "express";
import todoRoutes from "./modules/todo/todo.routes";
import userRoutes from "./modules/user/user.route";
import authRoutes from "./modules/auth/auth.route";
import { NOT_FOUND } from "./constants/http_status";
import { checkAuth } from "./midlewares/auth.middleware";

const router = Router();
router.use("/todo", checkAuth, todoRoutes);
router.use("/user", userRoutes);
router.use("/auth", authRoutes);

router.all("/{*any}", (req: Request, res: Response) => {
  return res
    .status(NOT_FOUND)
    .json({ data: { success: false, message: "Routes not found" } });
});

export default router;

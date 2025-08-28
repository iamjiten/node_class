import { validate } from "@/midlewares/validation.middleware";
import { Router } from "express";
import { createUser, loginUser } from "../user/user.validation";
import { loginHandler, registerHandler } from "./auth.controller";

const router = Router();

router.post("/register", validate(createUser), registerHandler);
router.post("/login", validate(loginUser), loginHandler);

export default router;

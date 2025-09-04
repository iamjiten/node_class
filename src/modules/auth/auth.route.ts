import { validate } from "@/midlewares/validation.middleware";
import { Router } from "express";
import { createUser, loginUser } from "../user/user.validation";
import {
  getUserProfileHandler,
  loginHandler,
  registerHandler,
} from "./auth.controller";
import { checkAuth } from "@/midlewares";

const router = Router();

router.post("/register", validate(createUser), registerHandler);
router.post("/login", validate(loginUser), loginHandler);
router.get("/", checkAuth, getUserProfileHandler);

export default router;

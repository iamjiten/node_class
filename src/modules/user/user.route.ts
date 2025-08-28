import { Router } from "express";
import { createUserHandler } from "./user.controller";
import { validate } from "@/midlewares/validation.middleware";
import { createUser } from "./user.validation";

const router = Router();
router.post("/", validate(createUser), createUserHandler);

export default router;

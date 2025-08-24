import { Router } from "express";
import {
  createTodoHandler,
  deleteTodoHandler,
  getTodoById,
  getTodoHandler,
  updateTodoHandler,
} from "./todo.controller";

import { validate } from "../../midlewares/validation.middleware";
import { createTodo } from "../../validations/todo.validation";

const router = Router();
router.post("/", validate(createTodo), createTodoHandler);
router.get("/", getTodoHandler);
router.patch("/:todoId", updateTodoHandler);

router.delete("/:todoId", deleteTodoHandler);
router.get("/:todoId", getTodoById);

export default router;

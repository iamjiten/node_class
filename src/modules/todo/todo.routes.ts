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

// router.post("/:todoId", (req: Request, res: Response) => {
//   // const { todoId } = req.params;
//   const todoId = req.params.todoId;
//   const data = req.body;

//   const found = todos.find((x: ITodo) => x.id == todoId);

//   if (!found) {
//     res.status(404).json({ message: "Todos not found" });
//   }

//   const filteredTodos = todos.filter((x) => x.id != todoId);

//   const newTodo: ITodo = {
//     id: todoId,
//     title: data.title,
//     status: data.status,
//   };
//   filteredTodos.push(newTodo);
//   todos = filteredTodos;

//   res.json(newTodo);
// });
router.patch("/:todoId", updateTodoHandler);

router.delete("/:todoId", deleteTodoHandler);
router.get("/:todoId", getTodoById);

export default router;

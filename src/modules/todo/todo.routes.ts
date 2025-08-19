import { Request, Response, Router } from "express";
import { ITodo } from "./todo.types";
import { v4 as uuidv4 } from "uuid";

let todos: ITodo[] = [];

const router = Router();

router.post("/", (req: Request, res: Response) => {
  const data = req.body;
  const tobePush: ITodo = {
    id: uuidv4(),
    title: data.title,
    status: data.status,
  };

  todos.push(tobePush);
  res.json(tobePush);
});

router.get("/", (req: Request, res: Response) => {
  res.json(todos);
});

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
router.patch("/:todoId", (req: Request, res: Response) => {
  // const { todoId } = req.params;
  const todoId = req.params.todoId;
  const data = req.body;

  const found = todos.findIndex((x: ITodo) => x.id == todoId);

  if (found < 0) {
    res.status(404).json({ message: "Todos not found" });
    return;
  }

  const newTodo: ITodo = {
    id: todoId,
    title: data.title,
    status: data.status,
  };
  todos.splice(found, 1, newTodo);

  res.json(newTodo);
});

router.delete("/:todoId", (req: Request, res: Response) => {
  // const { todoId } = req.params;
  const todoId = req.params.todoId;

  const found = todos.findIndex((x: ITodo) => x.id == todoId);

  if (found < 0) {
    res.status(404).json({ message: "Todos not found" });
    return;
  }

  todos.splice(found, 1);

  res.json({ message: "Todo deleted" });
});

export default router;

import { ITodo } from "./todo.types";
import { v4 as uuidv4 } from "uuid";
import { todos } from "./todo_data";
import { Request, Response } from "express";
import { CREATED, NOT_FOUND, OK } from "../../constants/http_status";

export const createTodoHandler = (req: Request, res: Response) => {
  const data = req.body;
  const tobePush: ITodo = {
    id: uuidv4(),
    title: data.title,
    status: data.status,
  };

  todos.push(tobePush);
  res.status(CREATED).json({
    message: "Todo created",
    success: true,
    statusCode: 201,
    data: { todo: tobePush },
  });
};

export const getTodoHandler = (req: Request, res: Response) => {
  res.status(OK).json({
    message: "List of Todos",
    success: true,
    statusCode: 200,
    data: { todos },
  });
};

export const updateTodoHandler = (req: Request, res: Response) => {
  // const { todoId } = req.params;
  const todoId = req.params.todoId;
  const data = req.body;

  const found = todos.findIndex((x: ITodo) => x.id == todoId);

  if (found < 0) {
    res.status(NOT_FOUND).json({ message: "Todos not found" });
    return;
  }

  const newTodo: ITodo = {
    id: todoId,
    title: data.title,
    status: data.status,
  };
  todos.splice(found, 1, newTodo);

  res.status(OK).json(newTodo);
};

export const deleteTodoHandler = (req: Request, res: Response) => {
  // const { todoId } = req.params;
  const todoId = req.params.todoId;

  const found = todos.findIndex((x: ITodo) => x.id == todoId);

  if (found < 0) {
    res.status(NOT_FOUND).json({ message: "Todos not found" });
    return;
  }

  todos.splice(found, 1);

  res.status(OK).json({ message: "Todo deleted" });
};

export const getTodoById = (req: Request, res: Response) => {
  const todoId = req.params.todoId;
  const found = todos.find((x: ITodo) => x.id == todoId);
  if (!found) {
    res.status(NOT_FOUND).json({ message: "Todos not found" });
  }
  res.status(OK).json(found);
};

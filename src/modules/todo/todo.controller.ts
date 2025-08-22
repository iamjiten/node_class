import { Request, Response } from "express";
import { CREATED, NOT_FOUND, OK } from "../../constants/http_status";
import {
  createTodo,
  deleteTodo,
  getAllTodo,
  getById,
  updateTodo,
} from "./todo.service";

export const createTodoHandler = async (req: Request, res: Response) => {
  const newTodo = await createTodo(req.body);
  res.status(CREATED).json({
    message: "Todo created",
    success: true,
    statusCode: 201,
    data: { todo: newTodo },
  });
};

export const getTodoHandler = async (req: Request, res: Response) => {
  const todos = await getAllTodo();
  res.status(OK).json({
    message: "List of Todos",
    success: true,
    statusCode: 200,
    data: { todos },
  });
};

export const updateTodoHandler = async (req: Request, res: Response) => {
  // const { todoId } = req.params;
  const todoId = req.params.todoId;

  const { success, message, statusCode, data } = await updateTodo(
    todoId,
    req.body
  );

  res.status(statusCode).json({ success, message, statusCode, data });
};

export const deleteTodoHandler = async (req: Request, res: Response) => {
  // const { todoId } = req.params;
  const todoId = req.params.todoId;
  const { success, message, statusCode } = await deleteTodo(todoId);
  res.status(statusCode).json({ message: message, success, statusCode });
};

export const getTodoById = async (req: Request, res: Response) => {
  const todoId = req.params.todoId;
  const found = await getById(todoId);

  if (!found) {
    res.status(NOT_FOUND).json({
      success: false,
      statusCode: NOT_FOUND,
      message: "Todos not found",
    });
  }
  res.status(OK).json({
    success: false,
    statusCode: NOT_FOUND,
    message: "Todos not found",
    data: { todo: found },
  });
};

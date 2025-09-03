import { Request, Response } from "express";

import {
  createTodo,
  deleteTodo,
  getAllTodo,
  getById,
  updateTodo,
} from "./todo.service";
import { CREATED, OK } from "@/constants/http_status";
import { NotFoundException } from "@/exceptions/notFound.exception";

export const createTodoHandler = async (req: Request, res: Response) => {
  // @ts-ignore
  const user = req.user;
  const newTodo = await createTodo(user._id, req.body);

  res.status(CREATED).json({
    message: "Todo created",
    success: true,
    statusCode: 201,
    data: { todo: newTodo },
  });
};

export const getTodoHandler = async (req: Request, res: Response) => {
  // @ts-ignore
  const user = req.user;
  const todos = await getAllTodo(user._id);
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

  const exist = await getById(todoId);
  if (!exist) {
    throw new NotFoundException("Todo not found");
    // res.status(NOT_FOUND).json({
    //   message: "Todo not found",
    //   success: true,
    //   statusCode: NOT_FOUND,
    // });
    // return;
  }
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
  console.log({ found, todoId });
  if (!found) {
    throw new NotFoundException("Todo not found");
    // res.status(NOT_FOUND).json({
    //   success: false,
    //   statusCode: NOT_FOUND,
    //   message: "Todos not found",
    // });
  }
  res.status(OK).json({
    success: false,
    statusCode: OK,
    message: "Todos not found",
    data: { todo: found },
  });
};

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
import { FilterQuery } from "mongoose";
import { TodoType } from "@/types/todo.types";

export const createTodoHandler = async (req: Request, res: Response) => {
  const user = req.user;
  const newTodo = await createTodo(`${user._id}`, req.body);

  res.status(CREATED).json({
    message: "Todo created",
    success: true,
    statusCode: 201,
    data: { todo: newTodo },
  });
};

export const getTodoHandler = async (req: Request, res: Response) => {
  const { status, q, per_page, page } = req.query;

  const user = req.user;
  const query: FilterQuery<TodoType> = {};
  query.user = `${user._id}`;
  if (status) query.status = status;

  if (q) {
    query.title = { $regex: q, $options: "i" };
  }

  let paginationData: { per_page: number; page: number } = {
    per_page: 1,
    page: 1,
  };
  if (per_page) paginationData.per_page = Number(per_page);
  if (page) paginationData.page = Number(page);

  const todos = await getAllTodo(query, paginationData);
  res.status(OK).json({
    message: "List of Todos",
    success: true,
    statusCode: 200,
    data: todos,
    query,
  });
};

export const updateTodoHandler = async (req: Request, res: Response) => {
  // const { todoId } = req.params;
  const todoId = req.params.todoId;

  const exist = await getById(todoId);
  if (!exist) {
    throw new NotFoundException("Todo not found");
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
  res.status(OK).json({
    success: false,
    statusCode: OK,
    message: "Todos not found",
    data: { todo: found },
  });
};

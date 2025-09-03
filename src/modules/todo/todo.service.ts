import { createTodoType } from "../../validations/todo.validation";
import { OK } from "../../constants/http_status";
import TodoModel from "../../models/todo.model";
import { TodoType } from "@/types/todo.types";
import { NotFoundException } from "@/exceptions";
import { FilterQuery } from "mongoose";

export const createTodo = async (
  userId: string,
  data: createTodoType
): Promise<TodoType> => {
  const todo = TodoModel.create({ ...data, user: userId });
  return todo;
};

export const getAllTodo = async (
  query: FilterQuery<TodoType>,
  paginationData?: { per_page: number; page: number }
) => {
  const { per_page, page } = paginationData;
  let currentPage = page ?? 1;
  let limit = per_page ?? 5;
  const skip = (currentPage - 1) * limit;
  const [count, todos] = await Promise.all([
    TodoModel.countDocuments(query),
    TodoModel.find(query)
      .select(["-user"])
      .limit(limit)
      .skip(skip)
      .sort("-createdAt"),
  ]);

  const pagination = {
    page: currentPage,
    per_page,
    total: count,
    total_page: Math.ceil(count / per_page),
  };
  return { pagination, todos };
};

export const getById = async (
  todoId: string,
  returnType: "obj" | "index" = "obj"
) => {
  const todo = await TodoModel.findById(todoId);
  if (!todo) throw new NotFoundException("Todo not found");
  return todo;
};

export const deleteTodo = async (todoId: string) => {
  const deletedTodo = await TodoModel.findByIdAndDelete(todoId);
  if (!deletedTodo) throw new NotFoundException("Todo not found from service");

  return {
    success: true,
    message: "Todo deleted",
    statusCode: OK,
  };
};

export const updateTodo = async (todoId: string, data: createTodoType) => {
  const updatedTodo = await TodoModel.findByIdAndUpdate(todoId, data, {
    new: true,
  });
  return {
    success: true,
    message: "Todo updated",
    statusCode: OK,
    data: { todo: updatedTodo },
  };
};

// import { ITodo } from "./todo.types";

import { createTodoType } from "../../validations/todo.validation";
import { NOT_FOUND, OK } from "../../constants/http_status";
import TodoModel from "./todo.model";

export const createTodo = async (data: createTodoType) => {
  const todo = TodoModel.create(data);
  // const tobePush: ITodo = {
  //   id: uuidv4(),
  //   title: data.title,
  //   status: data.status,
  // };
  // todos.push(tobePush);
  return todo;
};

export const getAllTodo = async () => {
  // const todos = TodoModel.find();
  // return todos;
  return TodoModel.find();
};

export const getById = async (
  todoId: string,
  returnType: "obj" | "index" = "obj"
) => {
  // : Promise<ITodo | number> => {
  return TodoModel.findById(todoId);
  // return returnType == "index"
  //   ? todos.findIndex((x: ITodo) => x.id == todoId)
  //   : todos.find((x: ITodo) => x.id == todoId);

  // if (returnType == "index") {
  //   const found = todos.findIndex((x: ITodo) => x.id == todoId);
  //   return found;
  // }
  // const found = todos.find((x: ITodo) => x.id == todoId);
  // return found;
};

export const deleteTodo = async (todoId: string) => {
  // const found = (await getById(todoId, "index")) as number;
  // const found = await getById(todoId, "index");
  // if (Number(found) < 0) {
  //   return {
  //     success: false,
  //     message: "Todos not found",
  //     statusCode: NOT_FOUND,
  //   };
  // }
  // todos.splice(Number(found), 1);
  // return {
  //   success: true,
  //   message: "Todo deleted",
  //   statusCode: OK,
  // }

  const deletedTodo = await TodoModel.findByIdAndDelete(todoId);
  if (!deletedTodo)
    return {
      success: false,
      message: "Todos not found",
      statusCode: NOT_FOUND,
    };

  return {
    success: true,
    message: "Todo deleted",
    statusCode: OK,
  };
};

export const updateTodo = async (todoId: string, data: createTodoType) => {
  // const found = await getById(todoId, "index");
  // if (Number(found) < 0) {
  //   return {
  //     success: false,
  //     message: "Todos not found",
  //     statusCode: NOT_FOUND,
  //     data: null,
  //   };
  // }
  // const newTodo: ITodo = {
  //   id: todoId,
  //   title: data.title,
  //   status: data.status,
  // };
  // todos.splice(Number(found), 1, newTodo);
  // return {
  //   success: true,
  //   message: "Todo updated",
  //   statusCode: OK,
  //   data: { todo: newTodo },
  // };
  // const found = await getById(todoId);
  // found.title = data.title;
  // found.status = data.status;
  // await found.save();

  // const updatedTodo = await TodoModel.findByIdAndUpdate(
  //   todoId,
  //   {
  //     $set: {
  //       title: data.title,
  //     },
  //   },
  //   {
  //     new: true,
  //   }
  // );
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

import { v4 as uuidv4 } from "uuid";
import { ITodo } from "./todo.types";
import { todos } from "./todo_data";
import { createTodoType } from "../../validations/todo.validation";
import { NOT_FOUND, OK } from "../../constants/http_status";

export const createTodo = async (data: createTodoType) => {
  const tobePush: ITodo = {
    id: uuidv4(),
    title: data.title,
    status: data.status,
  };
  todos.push(tobePush);
  return tobePush;
};

export const getAllTodo = async () => {
  return todos;
};

export const getById = async (
  todoId: string,
  returnType: "obj" | "index" = "obj"
): Promise<ITodo | number> => {
  return returnType == "index"
    ? todos.findIndex((x: ITodo) => x.id == todoId)
    : todos.find((x: ITodo) => x.id == todoId);

  // if (returnType == "index") {
  //   const found = todos.findIndex((x: ITodo) => x.id == todoId);
  //   return found;
  // }
  // const found = todos.find((x: ITodo) => x.id == todoId);
  // return found;
};

export const deleteTodo = async (todoId: string) => {
  // const found = (await getById(todoId, "index")) as number;
  const found = await getById(todoId, "index");
  if (Number(found) < 0) {
    return {
      success: false,
      message: "Todos not found",
      statusCode: NOT_FOUND,
    };
  }
  todos.splice(Number(found), 1);
  return {
    success: true,
    message: "Todo deleted",
    statusCode: OK,
  };
};

export const updateTodo = async (todoId: string, data: createTodoType) => {
  const found = await getById(todoId, "index");
  if (Number(found) < 0) {
    return {
      success: false,
      message: "Todos not found",
      statusCode: NOT_FOUND,
      data: null,
    };
  }

  const newTodo: ITodo = {
    id: todoId,
    title: data.title,
    status: data.status,
  };
  todos.splice(Number(found), 1, newTodo);
  return {
    success: true,
    message: "Todo updated",
    statusCode: OK,
    data: { todo: newTodo },
  };
};

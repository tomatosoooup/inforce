"use server";

import { findTodoById } from "@/lib/controllers/todo";

export const findTodo = async (todoId: number) => {
  const todo = await findTodoById(+todoId);

  if (!todo?.data)
    return { message: "Something went wrong!", status: 500, todo: null };

  return {
    success: "Todo was found successfully!",
    status: todo.status,
    todo: todo.data,
  };
};

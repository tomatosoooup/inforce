"use server";

import { deleteExistingTodo } from "@/lib/controllers/todo";

export const deleteTodo = async (todoId: number) => {
  const deletedTodo = await deleteExistingTodo({
    id: todoId,
  });

  if (!deletedTodo?.data)
    return { message: "Something went wrong!", status: 500, todo: null };

  return {
    success: "Todo was updated successfully!",
    status: deletedTodo.status,
    todo: deletedTodo.data,
  };
};

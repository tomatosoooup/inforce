"use server";

import * as z from "zod";
import { todoSchema } from "../../schemas/todo";
import { updateOldTodo } from "@/lib/controllers/todo";

export const updateTodo = async (
  values: z.infer<typeof todoSchema>,
  todoId: number
) => {
  const validatedFields = todoSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Wrong data!" };
  }

  const { title, description, status } = validatedFields.data;

  const updatedTodo = await updateOldTodo({
    id: todoId,
    title,
    description,
    status,
  });

  if (!updatedTodo?.data)
    return { message: "Something went wrong!", status: 500, todo: null };

  return {
    success: "Todo was updated successfully!",
    status: updatedTodo.status,
    todo: updatedTodo.data,
  };
};

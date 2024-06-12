"use server";

import * as z from "zod";
import { todoSchema } from "../../schemas/todo";
import { createNewTodo } from "@/lib/controllers/todo";

export const createTodo = async (
  values: z.infer<typeof todoSchema>,
  boardId: string
) => {
  const validatedFields = todoSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Wrong data!" };
  }

  const { title, description } = validatedFields.data;

  const todo = await createNewTodo({ title, description, boardId });

  if (!todo?.data)
    return { message: "Something went wrong!", status: 500, todo: null };

  return {
    success: "Todo was created successfully!",
    status: todo.status,
    todo: todo.data,
  };
};

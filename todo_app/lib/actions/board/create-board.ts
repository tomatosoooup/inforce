"use server";

import * as z from "zod";
import { boardSchema } from "../../schemas/board";
import { createNewBoard } from "../../controllers/board";

export const createBoard = async (values: z.infer<typeof boardSchema>) => {
  const validatedFields = boardSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Wrong data!" };
  }

  const { name } = validatedFields.data;

  const board = await createNewBoard({ name });

  if (!board?.data)
    return { message: "Something went wrong!", status: 500, board: null };

  return {
    success: "Board was created successfully!",
    status: board.status,
    board: board.data,
  };
};

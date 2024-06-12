"use server";

import * as z from "zod";
import { boardSchema } from "../../schemas/board";
import { updateOldBoard } from "../../controllers/board";

export const updateBoard = async (
  values: z.infer<typeof boardSchema>,
  boardId: string
) => {
  const validatedFields = boardSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Wrong data!" };
  }

  const { name } = validatedFields.data;

  const updatedBoard = await updateOldBoard({ id: boardId, name });

  if (!updatedBoard?.data)
    return { message: "Something went wrong!", status: 500, board: null };

  return {
    success: "Board was updated successfully!",
    status: updatedBoard.status,
    board: updatedBoard.data,
  };
};

"use server";

import { deleteExistingBoard } from "@/lib/controllers/board";

export const deleteBoard = async (boardId: string) => {
  const deletedBoard = await deleteExistingBoard({
    id: boardId,
  });

  if (!deletedBoard?.data)
    return { message: "Something went wrong!", status: 500, todo: null };

  return {
    success: "Todo was updated successfully!",
    status: deletedBoard.status,
    todo: deletedBoard.data,
  };
};

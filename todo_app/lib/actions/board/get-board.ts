"use server";

import { fetchBoardById } from "../../controllers/board";

export const findBoard = async (boardId: string) => {
  const board = await fetchBoardById(boardId);

  if (!board?.data)
    return { message: "Something went wrong!", status: 500, board: null };

  // I've added this function to show how react Suspense works.
  await new Promise((r) => setTimeout(r, 1000));

  return {
    success: "Board was found successfully!",
    status: board.status,
    board: board.data,
  };
};

"use server";

import { getAllBoards } from "../../controllers/board";

export const findAllBoards = async () => {
  const boards = await getAllBoards();

  if (!boards?.data)
    return { message: "Something went wrong!", status: 500, board: null };

  // I've added this function to show how react Suspense works.
  await new Promise((r) => setTimeout(r, 1000));

  return {
    success: "Boards were found successfully!",
    status: boards.status,
    boards: boards.data,
  };
};

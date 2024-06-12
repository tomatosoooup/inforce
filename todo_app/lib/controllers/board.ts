import { BoardType } from "@/typings/board";
import axios from "axios";

export const createNewBoard = async (boardData: { name: string }) => {
  try {
    return await axios.post(
      process.env.NEXT_PUBLIC_ENDPOINT + "boards",
      boardData
    );
  } catch (error) {
    console.error("CREATE_BOARD_ERROR", error);
    return null;
  }
};

export const getAllBoards = async () => {
  try {
    return await axios.get(process.env.NEXT_PUBLIC_ENDPOINT + "boards");
  } catch (error) {
    console.error("GET_ALL_BOARDS_ERROR", error);
  }
};

export const updateOldBoard = async (boardData: Partial<BoardType>) => {
  try {
    return await axios.patch(
      process.env.NEXT_PUBLIC_ENDPOINT + `boards/${boardData.id}`,
      boardData
    );
  } catch (error) {
    console.error("UPDATE_BOARD_ERROR", error);
    return null;
  }
};

export const fetchBoardById = async (boardId: string) => {
  if (!boardId) return null;

  try {
    return await axios.get(
      process.env.NEXT_PUBLIC_ENDPOINT + `boards/${boardId}`
    );
  } catch (error) {
    console.error("FETCH_BOARD_BY_ID_ERROR", error);
    return null;
  }
};

export const deleteExistingBoard = async (boardData: { id: string }) => {
  try {
    return await axios.delete(
      process.env.NEXT_PUBLIC_ENDPOINT + `boards/${boardData.id}`
    );
  } catch (error) {
    console.error("DELETE_TODO_ERROR", error);
    return null;
  }
};

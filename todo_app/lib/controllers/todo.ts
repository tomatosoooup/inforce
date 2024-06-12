import { TodoType } from "@/typings/todo";
import axios from "axios";

export const findTodoById = async (id: number) => {
  try {
    return await axios.get(process.env.NEXT_PUBLIC_ENDPOINT + `todos/${id}`);
  } catch (error) {
    console.error("FIND_TODO_ERROR", error);
    return null;
  }
};

export const createNewTodo = async (todoData: {
  title: string;
  description: string;
  boardId: string;
}) => {
  try {
    return await axios.post(
      process.env.NEXT_PUBLIC_ENDPOINT + "todos",
      todoData
    );
  } catch (error) {
    console.error("CREATE_TODO_ERROR", error);
    return null;
  }
};

export const updateOldTodo = async (todoData: Partial<TodoType>) => {
  try {
    return await axios.patch(
      process.env.NEXT_PUBLIC_ENDPOINT + `todos/${todoData.id}`,
      todoData
    );
  } catch (error) {
    console.error("UPDATE_TODO_ERROR", error);
    return null;
  }
};

export const deleteExistingTodo = async (todoData: { id: number }) => {
  try {
    return await axios.delete(
      process.env.NEXT_PUBLIC_ENDPOINT + `todos/${todoData.id}`
    );
  } catch (error) {
    console.error("DELETE_TODO_ERROR", error);
    return null;
  }
};

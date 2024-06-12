import { TodoType } from "./todo";

export type BoardType = {
  id: string;
  name: string;
  todo: TodoType[];
};

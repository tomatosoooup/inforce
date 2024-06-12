import { BoardType } from "@/typings/board";
import { TodoType } from "@/typings/todo";
import { create } from "zustand";

export type ModalType =
  | "createTodo"
  | "editTodo"
  | "deleteTodo"
  | "editBoard"
  | "deleteBoard";

interface ModalData {
  todo?: TodoType;
  boardId?: string;
  board?: BoardType;
}

interface ModalStore {
  type: ModalType | null;
  data?: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));

"use client";

import { useEffect, useState } from "react";

import { UpdateTodoModal } from "@/components/modals/update-todo-modal";
import { DeleteTodoModal } from "@/components/modals/delete-todo-modal";
import { CreateTodoModal } from "@/components/modals/create-todo-modal";
import { DeleteBoardModal } from "@/components/modals/delete-board-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <UpdateTodoModal />
      <DeleteTodoModal />
      <CreateTodoModal />
      <DeleteBoardModal />
    </>
  );
};

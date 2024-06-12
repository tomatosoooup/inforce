"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { BoardType } from "@/typings/board";

export const Footer = ({ board }: { board: BoardType }) => {
  const { onOpen } = useModal();

  return (
    <footer>
      <Button
        onClick={() => onOpen("deleteBoard", { board })}
        className="w-full mb-2"
        variant="destructive"
      >
        Delete board
      </Button>
    </footer>
  );
};

import { Suspense } from "react";
import { Board } from "../board/board";
import { Aside } from "./aside";
import { BoardSkeletron } from "../skeletrons/board-skeletron";

export const Main = ({ boardId }: { boardId: string }) => {
  return (
    <main className="flex flex-1 gap-x-4">
      <Aside boardId={boardId} />
      <Suspense key={"board"} fallback={<BoardSkeletron />}>
        <Board boardId={boardId} />
      </Suspense>
    </main>
  );
};

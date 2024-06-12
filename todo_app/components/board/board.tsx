import { BoardType } from "@/typings/board";
import { BoardCell } from "./board-cell";
import { Status } from "@prisma/client";
import { TodoType } from "@/typings/todo";
import { findBoard } from "@/lib/actions/board/get-board";
import { Footer } from "../layouts/footer";

interface BoardProps {
  boardId?: string;
}

export const Board = async ({ boardId }: BoardProps) => {
  const board: BoardType = (await findBoard(boardId as string))
    .board as BoardType;

  if (!board) {
    return <h2>Looks like there is no board</h2>;
  }

  const todoArray = board.todo.filter(
    ({ status }) => status === Status.TODO
  ) as TodoType[];

  const inProgressArray = board.todo.filter(
    ({ status }) => status === Status.IN_PROGRESS
  ) as TodoType[];

  const doneArray = board.todo?.filter(
    ({ status }) => status === Status.DONE
  ) as TodoType[];

  const cells = [
    {
      name: "To Do",
      todos: todoArray,
    },
    {
      name: "In Progress",
      todos: inProgressArray,
    },
    {
      name: "Done",
      todos: doneArray,
    },
  ];

  return (
    <div className="flex flex-col flex-1">
      <div className="shrink-0 flex-1 grid grid-cols-3 gap-x-2 overflow-y-auto">
        {cells.map(({ name, todos }) => (
          <BoardCell key={name} name={name} todos={todos} />
        ))}
      </div>
      <Footer board={board} />
    </div>
  );
};

import { AllBoards } from "../board/all-boards";
import { AddBoardForm } from "../forms/add-board-form";
import { UpdateBoardForm } from "../forms/update-board-form";
import { Separator } from "../ui/separator";

interface BoardProps {
  boardId?: string;
}

export const Aside = ({ boardId }: BoardProps) => {
  return (
    <aside className="flex flex-col gap-y-4 flex-1 max-w-[300px] border-r">
      <AddBoardForm />
      <Separator />
      <UpdateBoardForm boardId={boardId} />
      <AllBoards />
    </aside>
  );
};

"use client";

import { Plus } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { useModal } from "@/hooks/use-modal-store";
import { useSearchParams } from "next/navigation";

export const AddTodoCell = () => {
  const { onOpen } = useModal();
  const searchParams = useSearchParams();
  const boardId: string = (searchParams.get("boardId") as string) || "";

  return (
    <Card className="border-dashed border-4 min-h-[150px] flex items-center justify-center">
      <CardContent className="py-0">
        {/* I wanted to use Action Tooltip from shadcn-ui but it would stratch the process so I just used span with title. However it doesn't work on mobile */}
        <span title="Add Todo">
          <Plus
            className="w-8 h-8 text-gray-800 cursor-pointer"
            onClick={() => onOpen("createTodo", { boardId: boardId })}
          />
        </span>
      </CardContent>
    </Card>
  );
};

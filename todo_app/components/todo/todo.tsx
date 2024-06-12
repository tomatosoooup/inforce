"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useModal } from "@/hooks/use-modal-store";
import { TodoDto } from "@/lib/dtos/todo.dto";
import { TodoType } from "@/typings/todo";

import { Edit, Trash } from "lucide-react";

interface TodoProps {
  todo: TodoType;
  // index: number;
  // moveTodos: (dragI: number, hoverI: number) => void;
  // handleTodoDrop: (todo: TodoDto, oldI: number) => void;
  // oldIdx?: number;
}

export const Todo = ({
  todo,
}: // index,
// handleTodoDrop,
// moveTodos,
// oldIdx,
TodoProps) => {
  const { onOpen } = useModal();

  // Or we can use destructurization
  // const {id, title, description, status, boardId} = todo

  return (
    <Card className="h-[160px]">
      <CardHeader>
        <CardTitle className="text-lg">{todo.title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {todo.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-x-2 justify-end">
        <Edit
          className="w-6 h-6 cursor-pointer hover:text-blue-400"
          onClick={() => onOpen("editTodo", { todo })}
        />

        <Trash
          className="w-6 h-6 cursor-pointer hover:text-red-400"
          onClick={() => onOpen("deleteTodo", { todo })}
        />
      </CardContent>
    </Card>
  );
};

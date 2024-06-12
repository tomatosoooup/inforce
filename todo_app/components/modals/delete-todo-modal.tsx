"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { useModal } from "@/hooks/use-modal-store";

import { Button } from "../ui/button";

import { TodoType } from "@/typings/todo";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteTodo } from "@/lib/actions/todo/delete-todo";

export const DeleteTodoModal = () => {
  const router = useRouter();
  const { isOpen, onClose, type, data } = useModal();

  const [isPending, startTransition] = useTransition();

  const isModalOpen = isOpen && type === "deleteTodo";

  const todo = data?.todo as TodoType;

  const onSubmit = async () => {
    try {
      startTransition(() => {
        deleteTodo(+todo?.id).finally(() => {
          setTimeout(() => {
            router.refresh();
            onClose();
          }, 1500);
        });
      });

      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-center text-2xl text-bold">
              Delete todo - <span>{todo?.title}</span>
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Are you sure you want to{" "}
              <span className="text-red-600">DELETE</span> this todo ?
              <br />
              It will be deleted <b className="text-black">permanently</b>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="py-4 mx-auto flex gap-x-4">
            <Button
              type="button"
              disabled={isPending}
              variant="default"
              className="min-w-[200px]"
              onClick={() => onClose()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              variant="destructive"
              className="min-w-[200px]"
              onClick={() => onSubmit()}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

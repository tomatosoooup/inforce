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

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

import { deleteBoard } from "@/lib/actions/board/delete-board";

export const DeleteBoardModal = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { isOpen, onClose, type, data } = useModal();

  const [isPending, startTransition] = useTransition();

  const isModalOpen = isOpen && type === "deleteBoard";
  const boardId = data?.board?.id as string;

  const onSubmit = async () => {
    try {
      startTransition(() => {
        deleteBoard(boardId).finally(() => {
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
              Delete board - <span>{data?.board?.name}</span>
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Are you sure you want to{" "}
              <span className="text-red-600">DELETE</span> this board ?
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

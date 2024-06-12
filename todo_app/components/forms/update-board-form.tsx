"use client";

import * as z from "zod";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { boardSchema } from "@/lib/schemas/board";
import { Input } from "../ui/input";
import { ConfirmButton } from "../confirm-button";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateBoard } from "@/lib/actions/board/update-board";
import { findBoard } from "@/lib/actions/board/get-board";
import { BoardType } from "@/typings/board";

interface BoardProps {
  boardId?: string;
}

export const UpdateBoardForm = ({ boardId }: BoardProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(boardSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    const find = async () => {
      const board: BoardType = (await findBoard(boardId as string))
        .board as BoardType;
      if (board && board.name) {
        form.setValue("name", board.name);
      }
    };

    find();
  }, [boardId, form]);

  const onSubmit = async (values: z.infer<typeof boardSchema>) => {
    startTransition(() => {
      updateBoard(values, boardId as string)
        .then((data) => {
          setSuccess(data.success);
          setError(data.error);
        })
        .catch(() => {
          setError("Something went wrong!");
        })
        .finally(() => {
          setTimeout(() => {
            router.refresh();
            setSuccess("");
            setError("");
          }, 1000);
        });
    });
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="Board information">
        <AccordionTrigger className="pr-5">Board information</AccordionTrigger>
        <AccordionContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-y-2 w-full pr-5"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500">
                      Boards name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter name for board" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ConfirmButton className="min-w-[200px]" disabled={isPending}>
                Update board name
              </ConfirmButton>
              <FormError message={error} />
              <FormSuccess message={success} />
            </form>
          </Form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

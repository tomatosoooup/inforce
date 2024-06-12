"use client";

import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { ConfirmButton } from "../confirm-button";
import { useState, useTransition } from "react";
import { boardSchema } from "@/lib/schemas/board";
import { createBoard } from "@/lib/actions/board/create-board";
import { useRouter } from "next/navigation";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";

export const AddBoardForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof boardSchema>>({
    resolver: zodResolver(boardSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof boardSchema>) => {
    startTransition(() => {
      createBoard(values)
        .then((data) => {
          setSuccess(data.success);
          setError(data.error);
        })
        .catch(() => setError("Something went wrong!"))
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
    <>
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
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter name to create the board"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ConfirmButton className="min-w-[200px]" disabled={isPending}>
            Create
          </ConfirmButton>
          <FormError message={error} />
          <FormSuccess message={success} />
        </form>
      </Form>
    </>
  );
};

"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoSchema } from "@/lib/schemas/todo";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { useModal } from "@/hooks/use-modal-store";
import { useForm } from "react-hook-form";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import { useRouter } from "next/navigation";
import { createTodo } from "@/lib/actions/todo/create-todo";

export const CreateTodoModal = () => {
  const router = useRouter();
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "createTodo";

  const form = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof todoSchema>) => {
    try {
      if (data?.boardId) {
        createTodo(values, data?.boardId as string)
          .catch((err) => console.error(err))
          .finally(() => {
            setTimeout(() => {
              form.reset();
              router.refresh();
              onClose();
            }, 1000);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-center text-2xl text-bold">
              Create Todo
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Here you can provide title and description for your TODO
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 px-6"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      title
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={"Todo title"} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="py-4">
                <Button
                  disabled={isLoading}
                  variant="default"
                  className="min-w-[200px]"
                >
                  Create
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

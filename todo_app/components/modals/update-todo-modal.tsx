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
import { TodoType } from "@/typings/todo";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Status } from "@prisma/client";
import { updateTodo } from "@/lib/actions/todo/update-todo";

export const UpdateTodoModal = () => {
  const router = useRouter();
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "editTodo";

  const todo = data?.todo as TodoType;

  // I could make it another way and fetch TODO by ID but I've decided to make it faster with useModal data. faster but not safier
  const form = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: todo?.title || "",
      description: todo?.description || "",
      status: todo?.status || "",
    },
  });

  useEffect(() => {
    if (todo) {
      form.setValue("title", todo.title);
      form.setValue("description", todo.description);
      form.setValue("status", todo.status);
    }
  }, [todo]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof todoSchema>) => {
    try {
      updateTodo(values, +todo?.id)
        .catch((err) => console.error(err))
        .finally(() => {
          setTimeout(() => {
            form.reset();
            router.refresh();
            onClose();
          }, 1500);
        });
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
              Update your todo
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Here you can update <b>THIS</b> todo information
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
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500">
                      Todo title
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
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500">
                      Todo description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Change todo information"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500">
                      Status
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select status to assign"
                            {...field}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={Status.TODO}>
                          {Status.TODO}
                        </SelectItem>
                        <SelectItem value={Status.IN_PROGRESS}>
                          {Status.IN_PROGRESS}
                        </SelectItem>
                        <SelectItem value={Status.DONE}>
                          {Status.DONE}
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="py-4">
                <Button
                  disabled={isLoading}
                  variant="default"
                  className="min-w-[200px]"
                  type="submit"
                >
                  Update
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

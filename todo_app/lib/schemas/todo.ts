import * as z from "zod";

export const todoSchema = z.object({
  title: z
    .string()
    .min(4, { message: "Min length for todo is 4 characters" })
    .max(50, { message: "Max lengths for todo is 50 characters" }),

  description: z
    .string()
    .min(10, { message: "Min length is 10 characters" })
    .max(200, { message: "Max length is 200 characters" }),

  status: z.optional(z.string()),
});

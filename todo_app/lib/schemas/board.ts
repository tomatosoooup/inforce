import * as z from "zod";

export const boardSchema = z.object({
  name: z
    .string()
    .min(2, "Min length for board is - 2 characters")
    .max(30, { message: "Max length for board is - 30 characters" }),
});

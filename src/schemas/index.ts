import * as z from "zod";

export const ProductSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  count: z.string().min(1, { message: "Count is required" }),
  size: z.object({
    width: z.string().min(1, { message: "Width is required" }),
    height: z.string().min(1, { message: "Height is required" }),
  }),
  weight: z.string().min(1, { message: "Weight is required" }),
});

export const ReviewSchema = z.object({
  description: z.string().min(10, { message: "Description is required" }),
});

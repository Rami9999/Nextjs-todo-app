import { z } from "zod"

export const todoFormSchema = z.object({
    title: z
      .string({
        required_error: "Title is required",
      })
      .min(5, {
        message: "Title must be at least 2 characters.",
      })
      .max(70, {
        message: "Title must not be longer than 70 characters.",
      }),
      body: z.string().max(255,{message: "Short Description must not be longer than 255 characters."}).optional(),
      completed: z.boolean()
  });

export  type TodoFormValues = z.infer<typeof todoFormSchema>
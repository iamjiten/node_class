import * as z from "zod";

export const createTodo = z.object({
  title: z
    .string({ message: "Title is required" })
    .nonempty("Title is required 1")
    .min(3, { message: "Title must be atleast 3 character" }),
  status: z.boolean(),
});

export type createTodoType = z.infer<typeof createTodo>;

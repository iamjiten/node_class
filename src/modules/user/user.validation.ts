import z from "zod";

export const createUser = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.email().nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

export const loginUser = z.object({
  email: z.email().nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

export type CreateUserType = z.infer<typeof createUser>;
export type LoginUserType = z.infer<typeof loginUser>;

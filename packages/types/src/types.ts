import z from "zod";

export const signupSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(8),
});

export const signinSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const createRoomSchema = z.object({
  name: z.string().min(3).max(12)
})
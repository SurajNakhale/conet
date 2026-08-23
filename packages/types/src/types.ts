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


export const authSchema = z.object({
  type: z.literal("auth"),
  payload: z.object({
    token: z.jwt()
  })
})

export const joinSchema = z.object({
  type: z.literal("join"),
  payload: z.object({
    roomId: z.uuid()
  })
})

export const chatSchema = z.object({
  type: z.literal("chat"),
  payload: z.object({
    text: z.string().trim().min(1)
  })
})
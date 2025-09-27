import z from "zod";

export const chatSchema = z.object({
  message: z.string().min(1, { message: "Missing 'message' in request body" }),
  userId: z.string().min(1, { message: "Missing 'userId' in request body" }),
  threadId: z
    .string()
    .min(1, { message: "Missing 'threadId' in request body" }),
});

export type ChatValidation = z.infer<typeof chatSchema>;

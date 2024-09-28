import {z} from "zod"

export const MessageSchema = z.object({
    message: z
    .string()
    .min(10, "message must contain atleast 10 characters")
    .max(200, "message only contain atmost 200 characters")
})

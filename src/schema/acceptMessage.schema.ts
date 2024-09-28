import {z} from "zod"

export const AcceptMessageSchema = z.object({
    isMsgAccesspting: z.boolean()
})

import {z} from "zod"

export const VerifySchema = z.object({
    code: z.string().length(6, "This code invalid or used")
})
    

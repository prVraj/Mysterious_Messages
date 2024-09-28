import { z } from "zod"

export const UserValidation = z
    .string()
    .min(3, "user name must constain atleast 3 characters")
    .max(9, "user name must constain atleast 9 characters")
    .regex( /^[a-zA-Z0-9_]+$/, "user name does not contain any special character" )


export const SignUpSchema = z.object({
    username: UserValidation,
    email: z.string().email({message: "Invalid email address"}),

    password: z
    .string()
    .min(6, "password must contains atleast 6 characters")
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "Password must contain at least one letter and one number")
})


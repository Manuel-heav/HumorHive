import * as z from "zod"
 

export const SignupValidation = z.object({
    name: z.string().min(2, {message: "That all you got? Come on."}).max(50, {message: "Too much bro."}),
    username: z.string().min(2, {message: "Provide a longer username please."}).max(50, {message: "Too much bro."}),
    email: z.string().email(),
    password: z.string().min(8, {message: "Longer is always better, THAT'S WHAT SHE SAID!"}),
  })

  export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })

  export const PostValidation = z.object({
    caption: z.string().min(5).max(2200),
    file: z.custom<File[]>(),
    tags: z.string(),
    location: z.string().min(2).max(100),
  })

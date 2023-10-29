import * as z from "zod"
 

export const SignupValidation = z.object({
    name: z.string().min(2, {message: "That all you got. Come on."}).max(50),
    username: z.string().min(2, {message: "Provide a longer username please."}).max(50),
    email: z.string().email(),
    password: z.string().min(8, {message: "Longer(password) is always better, THAT'S WHAT SHE SAID!"}),
  })
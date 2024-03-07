import { z } from 'zod'
export const guestRegisterVariables = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    idImage:z.string()
})
export const loginVariables = z.object({
    email: z.string().email(),
    password: z.string()
})
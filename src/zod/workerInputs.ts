import Email from 'next-auth/providers/email'
import {z} from 'zod'
export const registerVariables = z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string()
})
export const loginVariables = z.object({
    email:z.string().email(),
    password:z.string()
})
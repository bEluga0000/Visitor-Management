import Email from 'next-auth/providers/email'
import { string, z } from 'zod'
export const registerVariables = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
})
export const loginVariables = z.object({
    email: z.string().email(),
    password: z.string()
})
export const createMeetingVariable = z.object({
    hostId: z.string(),
    topic: z.string(),
    date: z.string(),
    loc: z.string(),
    starttime: z.string(),
    endtime: z.string()
})
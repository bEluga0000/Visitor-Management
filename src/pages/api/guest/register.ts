import { registerVariables } from "@/zod/workerInputs";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt'
import prisma from '@/libs/prismadb'
import { guestRegisterVariables } from "@/zod/guestInputs";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method != 'POST') {
        res.status(500).end()
    }
    try {
        const parsedInputs = guestRegisterVariables.safeParse(req.body)
        if (!parsedInputs.success) {
            res.status(400).json({ message: "Enter valid Inputs" })
            return;
        }
        const { name, email, password ,idImage} = parsedInputs.data
        const hashedPassword = await bcrypt.hash(password, 12)
        const guest = await prisma?.guest.create({
            data: {
                name,
                email,
                password,
                hashedPassword,
                idImage
            }
        })
        res.status(201).json({ guest })
    }
    catch (e) {
        console.log(e)
        res.status(400).end()
    }

}

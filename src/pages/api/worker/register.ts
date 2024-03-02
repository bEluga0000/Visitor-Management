import { registerVariables } from "@/zod/workerInputs";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt'
import prisma from '@/libs/prismadb'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if(req.method !='POST')
    {
        res.status(500).end()
    }

    try
    {
        const parsedInputs = registerVariables.safeParse(req.body)
        if(!parsedInputs.success)
        {
            res.status(400).json({message:"Enter valid Inputs"})
            return;
        }
        const {name,email,password} = parsedInputs.data
        const hashedPassword = await bcrypt.hash(password,12)
        const worker = await prisma?.workers.create({
            data:{
                name,
                email,
                password,
                hashedPassword
            }
        })
        res.status(201).json({worker})
    }
    catch(e)
    {
        console.log(e)
        res.status(400).end()
    }
    
}

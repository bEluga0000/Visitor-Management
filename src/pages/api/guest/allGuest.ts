import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/libs/prismadb'

export default  async function handler(req:NextApiRequest,res:NextApiResponse)
{
    if(req.method!=='GET')
    {
        res.status(405).end
    }
    const guests = await prisma.guest.findMany()
    if(guests)
    {
        res.status(201).json(guests)
    }
    else
    {
        res.status(404).json({message:"Erro in finding the Guests"})
    }
}
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prisma from '@/libs/prismadb'

const serverAuth = async (req:NextApiRequest,res:NextApiResponse)=>{
    const session = await getServerSession(req,res,authOptions)
    if(!session?.user?.email)
    {
        throw new Error("Please Sigin")
    }
    const currentWorker = await prisma?.workers.findUnique({
        where:{
            email:session.user.email
        }
    })

    if(!currentWorker)
    {
        
        throw new Error("NOt signed in");
    }
    
    return {currentWorker}
}
export default serverAuth;
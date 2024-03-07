import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/libs/prismadb'
export default  async function handler(req:NextApiRequest,res:NextApiResponse)
{
    if(req.method !== 'GET')
    {
        res.status(405).end()
    }
    const {meetingId} = req.query
    try
    {
        if(typeof(meetingId) !=='string')
        {
            throw new Error ("Error in the type of id")
        }
        const meeting = await prisma.meeting.findUnique({
            where: {
                id: meetingId
            },
            include:{
                worker:{
                    select:{
                        name:true
                    }
                },
                guests:{
                    select:{
                        name:true,
                        email:true,
                        id:true
                    }
                }
            }
        })
        if (!meeting) {
            res.status(404).json({ message: "Enter the valid meeting id" })
        }
        else {
            res.status(201).json(meeting)
        }
    }
    catch(e)
    {
        console.log(e)
        res.status(403).end()
    }
    
}
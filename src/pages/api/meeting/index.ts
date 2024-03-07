import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/libs/prismadb'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // ? We are making the post request but still we getting the meeting of that specific worker
    if (req.method !== 'POST') {
        res.status(405).end()
    }
    try {
        const {hostId} = req.body
        const meeting = await prisma.meeting.findMany({
            where: {
                host:hostId
            },
            include:{
                worker:{
                    select:{
                        name:true
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
    catch (e) {
        console.log(e)
        res.status(403).end()
    }

}
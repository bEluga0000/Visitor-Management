import { createMeetingVariable } from "@/zod/workerInputs";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/libs/prismadb'
import client from "@/libs/prismadb";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    if(req.method !== 'POST')
    {
        res.status(405).end()
    }
    try
    {
        const parsedInput = createMeetingVariable.safeParse(req.body)
        if (!parsedInput.success) {
            res.status(400).json({ message: "Enter the valid inputs" })
            return;
        }
        const { hostId, topic, date, loc, starttime, endtime } = parsedInput.data
        const meeting = await prisma.meeting.create({
            data: {
                host: hostId,
                date,
                starttime,
                endtime,
                location: loc,
                topic
            }
        })
        if (meeting) {
            res.status(201).json(meeting)
        }
        else
        {
            res.status(401).json({message:"Error while creating meeting"})
        }
    }
    catch(e)
    {
        console.log(e)
        res.status(403).end()
    }

}
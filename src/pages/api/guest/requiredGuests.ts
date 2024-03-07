import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/libs/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.status(405).end
    }
    const meetingId = req.query.meetingId;
    console.log(meetingId)
    if (!meetingId) {
        res.status(401).json({ message: "Send the meeting Id" })
    }
    if (typeof (meetingId) === 'string') {
        console.log("I am rinning")
        const guests = await prisma.guest.findMany(
            {
            where: {
                NOT: {
                    meeting: {
                        some: {
                            id: meetingId
                        }
                    }
                }
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        }
        );
        res.status(201).json(guests)

    }
    else {
        res.status(404).json({ message: "Error in finding the Guests" })
    }
}
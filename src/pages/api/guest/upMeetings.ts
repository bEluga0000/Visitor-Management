import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/libs/prismadb'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // ? We are making the post request but still we getting the meeting of that specific worker
    if (req.method !== 'POST') {
        res.status(405).end()
    }
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const { guestId } = req.body
        const guest = await prisma.guest.findUnique({
            where: { id: guestId },
            include: { meeting: { where:{
                date:{
                    gte: today
                }
            },include: { worker: true } } }, // Use 'meeting' instead of 'meetings'
        });
        if (!guest) {
            res.status(404).json({ message: "Enter the valid meeting id" })
        }
        else {
            res.status(201).json(guest)
        }
    }
    catch (e) {
        console.log(e)
        res.status(403).end()
    }

}
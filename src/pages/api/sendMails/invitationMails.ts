import mailFOrmat from "@/libs/mails/mailFOrmat";
import meetingInvitationFormat  from "@/libs/mails/meetingIvitation";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb"

interface WorkerProps {
    name: string
}
interface GuestProps {
    name: string
    email: string
    id: string
}
interface MeetingPrpos {
    id: string
    host: string
    topic: string
    date: string
    guests?: GuestProps[]
    location: string
    parkingLocation: string | null
    starttime: string
    endtime: string
    worker: WorkerProps
}
export default async function handler(req:NextApiRequest,res:NextApiResponse)
{
    if (req.method != 'POST') {
        res.status(500).end()
    }
    //todo  Need to generate qr code on the basis of the userId and meeting id after that i need send email once email sent we need to update the meeting quests part and all done
    try{
        const { fmeeting, guestId, guestEmail }:{fmeeting:MeetingPrpos,guestId:string,guestEmail:string} = req.body
        const meetingId = fmeeting.id
        const meetingInvitehtmlFormat = meetingInvitationFormat({host:"monk",date:"23:4",time:"11.15",location:"bng",parking:"b2",guestId:guestId,meetingId:fmeeting.id})
        let transpoter = mailFOrmat()
        let message = {
            from: process.env.EMAIL_USER,
            // need to add guest email here
            to: "shreyas302005@gmail.com",
            subject: "We welcome you from Company_name",
            html: meetingInvitehtmlFormat
        }
        await transpoter.sendMail(message)
        await prisma.meeting.update({
            where:{
                id:meetingId
            },
            data:{
                guests:{
                    connect:{
                        id:guestId
                    }
                }
            }
        })
        return res.status(201).json({ message: "Invitation sent successfully" })
    }
    catch(e)
    {
        console.log(e)
        res.status(401).json(e)
    }
    
}
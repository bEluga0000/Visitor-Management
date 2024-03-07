import { invitationRegisterMailFormat } from "@/libs/mails/invitationRegistrationMail";
import mailFOrmat from "@/libs/mails/mailFOrmat";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method!== "POST")
    {
        res.status(500).end()
    }
    try
    {
        const {email} = req.body
        let transporter = mailFOrmat()
        let message = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "We welcome you from Company_name",
            html: invitationRegisterMailFormat
        }
        transporter.sendMail(message).then(()=>{
            return res.status(201).json({message:"Email Sent Successfully "})
        }).catch((e)=>{
            console.log(e)
            throw new Error ("Error while sending the mail")
        })

    }
    catch(e)
    {
        console.log(e)
        res.status(405).json(e)
    }
}
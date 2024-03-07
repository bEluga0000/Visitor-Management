import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method !== 'GET')
    {
        res.status(405).end()
    }
    try
    {
        const user = await serverAuth(req,res)
        if(user.currentWorker)
        {
            res.status(200).json(user.currentWorker)
        }
        if(user.currentGuest)
        {
            res.status(200).json(user.currentGuest)
        }
    }
    catch(err)
    {
        // console.log(err)
        res.status(400).end()
    }
}
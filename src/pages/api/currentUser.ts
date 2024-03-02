import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method !== 'GET')
    {
        res.status(405).end()
    }
    try
    {
        const {currentWorker} = await serverAuth(req,res)
        res.status(200).json(currentWorker)
    }
    catch(err)
    {
        console.log(err)
        res.status(400).end()
    }
}
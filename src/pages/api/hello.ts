// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import qr from "qrcode"
type Data = {
  name: string;
  msg: string;
};
import { google } from 'googleapis'
import generateQR from "@/libs/generateQR";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const qrcode = generateQR({meetingId:"1122",guestId:"12233445"})
  res.status(201).json(qrcode)
}




  // let qrc = ""
  // let data = {
  //   meetingId:"122344",
  //   id:"111000"
  //
  // let setJson = JSON.stringify(data)
  // qr.toString(setJson, {type: "terminal"}, function (err, code) {
  //   if(err)
  //   {
  //     console.log(err)
  //   }
  //   else
  //   {
  //     console.log(code)
  //     let qrc =code
  //   }
  // })
  // res.status(200).json({ name: "Looser", msg:"Welcome you looser",code:qrc });
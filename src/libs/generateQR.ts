import QrCode from "qrcode"

export default function generateQR({meetingId,guestId}:{guestId:string,meetingId:string})
{
    let src;
    let data = {
        meetingId,
        guestId
    }
    let dataString = JSON.stringify(data)
    QrCode.toDataURL(dataString,(err,codeDataUrl)=>{
        if(err)
        {
            throw new Error("Error while creating QRCODE")
        }
        else
        {
            console.log(codeDataUrl)
            src = codeDataUrl
        }

    })
    return src
}
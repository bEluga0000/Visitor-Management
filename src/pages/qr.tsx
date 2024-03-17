import { useCallback, useEffect } from "react";
import { useState } from "react";
import QRCode from 'qrcode'
import axios from "axios";
import generateQR from "@/libs/generateQR";
const Qr = () => {
    const [src, setSrc] = useState("")
    // const [generate, setGenrated] = useState(false)
    // const [userId, setUserId] = useState("")
    // const [meetingId, setMeetingId] = useState("")
    // const generateFunc = useCallback(()=>{
    //     QRCode.toDataURL(`http://localhost:3000/${meetingId}`).then(setSrc)
    //     setGenrated(true)
    // },[meetingId])
    // if (!generate) {
    //     return <>
    //         <input type="text" placeholder="meetingId" value={meetingId} onChange={(e) => { setMeetingId(e.target.value) }} />
    //         <input type="text" placeholder="userId" value={userId} onChange={(e) => { setUserId(e.target.value) }} />
    //         <button onClick={generateFunc}>Generate</button>
    //     </>
    // }
    const qrcode = generateQR({ meetingId: "1122", guestId: "12233445" })
    // setSrc(qrcode)
    console.log(qrcode)
    return <>
    {/* <input type="text" placeholder="meetingId" value={meetingId} onChange={(e) => { setMeetingId(e.target.value) }} /> */}
            {/* <input type="text" placeholder="userId" value={userId} onChange={(e) => { setUserId(e.target.value) }} /> */}
            {/* <button onClick={generateFunc}>Generate</button> */}
            {
            qrcode && <img src={qrcode} alt="" />
            }
        
    </>
}
export default Qr;
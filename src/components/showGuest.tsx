import { useCallback, useState } from "react"
import { Button } from "./Button"
import axios from "axios"
import toast from "react-hot-toast"
import { Typography } from "@mui/material"
interface ShowGuestProps
{
    name:string
    email:string
    id:string
    meeting:MeetingPrpos|null
    buttonNeed?:boolean
}
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
export const ShowGuest = ({
    name,
    email,
    id,
    meeting,
    buttonNeed
}:ShowGuestProps)=>{
    const[buttonLoading,setButtonLoading] = useState(false)
    const [sent,setSent] = useState(false)
    const onSubmit = useCallback(async () => {
        if(!meeting)
        {
            return;
        }
        try {
            setButtonLoading(true)
            const res = await axios.post("/api/sendMails/invitationMails", {
                guestEmail: email,
                guestId:id,
                guestName:name,
                fmeeting:meeting
            })
            if(res.data)
            {
                setSent(true)
                toast.success("invitation succesfully")
            }
        } catch (e) {
            console.log(e)
            toast.error("Not able to send the mail")
        }
        finally{
            setButtonLoading(false)
        }
    }, [email,meeting,id])
    return <div style={{ display: "flex", flexDirection: "column", width: "100wh" ,padding:'1rem'}}>
        <div style={{ display: "flex", justifyContent: "space-between", gap:'3rem',alignItems:'center' }}>
            <Typography fontSize={'1.2rem'} textAlign={"center"}>{name}</Typography>
            <Typography fontSize={'1.2rem'} textAlign={"center"}>{email}</Typography>
            {
                buttonNeed && <Button onclick={sent? ()=>{} : onSubmit} label={sent ? "invited":"Invite"} secondary large disabled={sent || buttonLoading}></Button>
            }
        </div>
    </div>
}
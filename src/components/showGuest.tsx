import { useCallback } from "react"
import { Button } from "./Button"
import axios from "axios"
import toast from "react-hot-toast"
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
    const onSubmit = useCallback(async () => {
        if(!meeting)
        {
            return;
        }
        try {
            const res = await axios.post("/api/sendMails/invitationMails", {
                guestEmail: email,
                guestId:id,
                fmeeting:meeting
            })
        } catch (e) {
            console.log(e)
            toast.error("Not able to send the mail")
        }
    }, [email,meeting,id])
    return <div style={{ display: "flex", flexDirection: "column", width: "100wh" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>{name}</h3>
            <h3>{email}</h3>
            {
                buttonNeed && <Button onclick={onSubmit} label="Send iviatation" secondary></Button>
            }
        </div>
    </div>
}
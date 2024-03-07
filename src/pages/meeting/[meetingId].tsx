import { ShowGuest } from "@/components/showGuest";
import { idState } from "@/store/selectors/userSelectors";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRecoilValue } from "recoil";
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

const Meeting = () => {
    const hostId = useRecoilValue(idState)
    const router = useRouter()
    const [meeting, setMeeting] = useState<MeetingPrpos | null>(null)
    const [isLoading, setLoading] = useState<boolean>(true)
    const [guests, setGuests] = useState<GuestProps[]>([])
    const { meetingId } = router.query
    useEffect(() => {
        const inti = async () => {
            try {
                const res1 = await axios.get(`/api/meeting/${meetingId}`)
                if (!res1.data) {
                    throw new Error("Meeting not found")
                }
                setMeeting(res1.data)
                const res2 = await axios.get(`/api/guest/requiredGuests?meetingId=${meetingId}`);
                setGuests(res2.data)


            }
            catch (e) {
                console.log(e)
                toast.error("SOmeting went Wrong")
            }
            finally {
                setLoading(false)
            }
        }
        inti()
    }, [meetingId, hostId])
    if (isLoading) {
        return <CircularProgress />
    }
    // if(!meeting)
    // {
    //     router.push("/")
    // }
    return <div>
        <div style={{ display: "flex", flexDirection: "column", width: "100wh" }}>
            <h1 style={{ textAlign: "center" }}>Meeting Detals</h1>
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                <h2 style={{ textAlign: "center" }}>Topic:  Upcoming land Project</h2>
                <h3 style={{ textAlign: "center" }}>Date: 20-7-2023</h3>
            </div>
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                <h2 style={{ textAlign: "center" }}>host:  Host Email</h2>
                <h3 style={{ textAlign: "center" }}>Time: 2:00</h3>
            </div>
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                <h2 >Location:  Google Link of the location</h2>
                <h3>Parking Allocation:Neat 10 </h3>
            </div>
        </div>
        <h2 style={{ textAlign: "center" }}>Invite Guests</h2>
        {guests.map((g) => (
            <ShowGuest name={g.name} id={g.id} email={g.email} meeting={meeting} buttonNeed/>
        ))}
        <h2 style={{ textAlign: "center" }}>Invited guest</h2>
        {
            meeting?.guests?.map((g)=>(
                <ShowGuest name={g.name} id={g.id} email={g.email} meeting={meeting} />
            ))
        }
    </div>
}
export default Meeting;
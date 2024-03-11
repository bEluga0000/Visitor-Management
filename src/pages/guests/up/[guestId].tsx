import { ShowMeeting } from "@/components/showMeeting";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface WorkerProps {
    name: string
}
interface MeetingPrpos {
    id: string
    host: string
    topic: string
    date: string
    guests?: string[]
    location: string
    parkingLocation: string | null
    starttime: string
    endtime: string
    worker: WorkerProps
}
const UpCominMeetings = () => {
    const router = useRouter()
    const { guestId } = router.query
    const [meeting, setMeeting] = useState<MeetingPrpos[]>([])
    const onSubmit = (async (id: string) => {
        router.push(`/guests/meeting/${id}`)
    })
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        if (localStorage.getItem('userId') && !localStorage.getItem('isGuest')) {
            router.push('/');
        }
        if (!localStorage.getItem('userId') || !localStorage.getItem('isGuest')) {
            router.push('/guests');
        }
    }, []);
    useEffect(() => {
        console.log(meeting)
        const init = async () => {
            try {
                const res = await axios.post("/api/guest/upMeetings", {
                    guestId
                })
                if (!res.data) {
                    throw new Error("There is no response ")
                }
                setMeeting(res.data.meeting)
                console.log(res.data)
            }
            catch (e) {
                console.log(e)
            }
            finally {
                setIsLoading(false)
            }

        }
        init();
    }, [guestId])
    if (isLoading) {
        return <CircularProgress />
    }
    if (meeting.length === 0) {
        return <>
            <h1>
                No meeting are there
            </h1>
        </>
    }
    return <div style={{ width: "100wh", display: "flex", flexDirection: "column" }}>
        {
            meeting.map((m) => {
                return <ShowMeeting id={m.id} name={m.worker.name} date={m.date} topic={m.topic} onclick={() => { onSubmit(m.id) }} />
            })
        }
    </div>

}

export default UpCominMeetings;
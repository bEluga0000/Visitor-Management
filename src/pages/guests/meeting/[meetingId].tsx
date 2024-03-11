import { ShowGuest } from "@/components/showGuest";
import { idState } from "@/store/selectors/userSelectors";
import { CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import { AlarmClock, CalendarDays, Highlighter, MapPin, ParkingCircle, User } from "lucide-react";
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
    const { meetingId } = router.query
    useEffect(() => {
        if (localStorage.getItem('userId') && !localStorage.getItem('isGuest')) {
            router.push('/');
        }
        if (!localStorage.getItem('userId') && !localStorage.getItem('isGuest')) {
            router.push('/guests');
        }
    }, []);
    useEffect(() => {
        const inti = async () => {
            try {
                const res1 = await axios.get(`/api/meeting/${meetingId}`)
                if (!res1.data) {
                    throw new Error("Meeting not found")
                }
                setMeeting(res1.data)
            }
            catch (e) {
                console.log(e)
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
    return <div style={{ minHeight: '90vh' }}>
        <div className="flex flex-col md:flex-row" style={{ minHeight: '90vh', width: '100wh', padding: '5px' }}>
            <div className="flex flex-col w-full  p-2 " style={{ justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ padding: '2rem 3rem', backgroundColor: 'whitesmoke',borderRadius:'1.5rem' }} className="border-2  shadow-lg">
                    <Typography variant="h4" style={{ textAlign: "center", paddingBottom: '1rem' }} fontWeight={600}>{meeting?.topic}</Typography>
                    <div className="flex flex-col gap-4 mt-4" style={{ textAlign: 'center' }}>
                        {/* <div className="flex justify-between"> */}
                        {/* <Typography fontSize="lg" style={{ textAlign: "left" }}> <Highlighter style={{ display: 'inline', color: 'green' }} /></Typography> */}
{/* 
                        <Typography fontSize="20px" style={{ textAlign: "center" }}> {meeting?.topic}</Typography> */}
                        <Typography fontSize="20px" >
                            {/* <CalendarDays style={{ display: 'inline', color: 'green' }} /> */}
                            on {meeting?.date.split("T")[0]}</Typography>
                        {/* </div> */}
                        {/* <div className="flex justify-between"> */}
                        <Typography fontSize="20px" className="" style={{ textAlign: "center" }}>
                            {/* <User style={{ display: 'inline', color: 'green' }} /> */}
                            hosted {meeting?.worker.name}</Typography>
                        <Typography fontSize="20px" className="" style={{ textAlign: "center" }}>
                            {/* <AlarmClock style={{ display: 'inline', color: 'green' }} /> */}
                            Starts from {meeting?.starttime}</Typography>
                        {/* </div> */}
                        {/* <div className="flex justify-between"> */}
                        <Typography fontSize="20px" className="" style={{ textAlign: "center" }}>
                            {/* <MapPin style={{ display: 'inline', color: 'green' }} /> */}
                            Place {meeting?.location}</Typography>
                        <Typography fontSize="20px" className="" style={{ textAlign: "center" }}>
                            {/* <ParkingCircle style={{ display: 'inline', color: 'green' }} /> */}
                            Allocated parking area {meeting?.parkingLocation ? meeting.parkingLocation : 'Building parking area'} </Typography>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        {/*  */}
        {/* <div className="flex flex-col md:flex-row" style={{  width: '100wh', padding: '5px' }}>
            <div className="flex flex-col w-full  border-2 rounded-md p-10 bg-yellow-200 ">
                <Typography variant="h4" style={{ textAlign: "center" }} fontWeight={600}>Meeting Details</Typography>
                <div className="flex flex-col gap-4 mt-4">
                    <div className="flex justify-between">
                        <Typography fontSize="lg" className="w-1/2" style={{ textAlign: "left" }}><Highlighter style={{ display: 'inline', color: 'green' }} />: {meeting?.topic}</Typography>
                        <Typography fontSize="lg" style={{ textAlign: "right" }}><CalendarDays style={{ display: 'inline', color: 'green' }} />: {meeting?.date.split("T")[0]}</Typography>
                    </div>
                    <div className="flex justify-between">
                        <Typography fontSize="lg" className="w-1/2" style={{ textAlign: "left" }}><User style={{ display: 'inline', color: 'green' }} />: {meeting?.worker.name}</Typography>
                        <Typography fontSize="lg" className="w-1/2" style={{ textAlign: "right" }}><AlarmClock style={{ display: 'inline', color: 'green' }} />: {meeting?.starttime}</Typography>
                    </div>
                    <div className="flex justify-between">
                        <Typography fontSize="lg" className="w-1/2" style={{ textAlign: "left" }}><MapPin style={{ display: 'inline', color: 'green' }} />: {meeting?.location}</Typography>
                        <Typography fontSize="lg" className="w-1/2" style={{ textAlign: "right" }}><ParkingCircle style={{ display: 'inline', color: 'green' }} />: {meeting?.parkingLocation ? meeting.parkingLocation:'Building parking area'} </Typography>
                    </div>
                </div>
            </div>*/}
        </div> 
        <div>
        </div>
    </div>
}
export default Meeting;
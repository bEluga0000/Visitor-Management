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
    const [guests, setGuests] = useState<GuestProps[]>([])
    useEffect(() => {
        if (localStorage.getItem('userId') && localStorage.getItem('guest')) {
            router.push('/isGuests');
        }
        if (!localStorage.getItem('userId') && !localStorage.getItem('isGuest')) {
            router.push('/');
        }
    }, []);
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
    return <div style={{ minHeight: '90vh' }}>
        <div className="flex flex-col md:flex-row" style={{minHeight:'90vh',width:'100wh',padding:'5px'}}>
            <div className="flex flex-col w-full md:w-1/2  p-2 " style={{justifyContent:'center',alignItems:'center'}}>
                <div style={{ padding: '2rem 3rem' ,backgroundColor:'whitesmoke'}} className="border-2 rounded-md shadow-lg">
                <Typography variant="h4" style={{ textAlign: "center" ,paddingBottom:'1rem'}} fontWeight={600}>Meeting Details</Typography>
                <div className="flex flex-col gap-4 mt-4" style={{textAlign:'center'}}>
                    {/* <div className="flex justify-between"> */}
                        {/* <Typography fontSize="lg" style={{ textAlign: "left" }}> <Highlighter style={{ display: 'inline', color: 'green' }} /></Typography> */}
                        
                        <Typography fontSize="lg"  style={{ textAlign: "center" }}> {meeting?.topic}</Typography>
                        <Typography fontSize="lg" >
                            {/* <CalendarDays style={{ display: 'inline', color: 'green' }} /> */}
                            on {meeting?.date}</Typography>
                    {/* </div> */}
                    {/* <div className="flex justify-between"> */}
                        <Typography fontSize="lg" className="" style={{ textAlign: "center" }}>
                            {/* <User style={{ display: 'inline', color: 'green' }} /> */}
                            hosted By {meeting?.worker?.name}</Typography>
                        <Typography fontSize="lg" className="" style={{ textAlign: "center" }}>
                            {/* <AlarmClock style={{ display: 'inline', color: 'green' }} /> */}
                            Starts from 2:00</Typography>
                    {/* </div> */}
                    {/* <div className="flex justify-between"> */}
                        <Typography fontSize="lg" className="" style={{ textAlign: "center" }}>
                            {/* <MapPin style={{ display: 'inline', color: 'green' }} /> */}
                            Place {meeting?.location}</Typography>
                        <Typography fontSize="lg" className="" style={{ textAlign: "center" }}>
                            {/* <ParkingCircle style={{ display: 'inline', color: 'green' }} /> */}
                            Allocated parking area {meeting?.parkingLocation ? meeting.parkingLocation : 'Building parking area'} </Typography>
                    {/* </div> */}
                </div>
                </div>
            </div>

            <div className="flex flex-col w-full md:w-1/2">
                <Typography variant="h4" style={{ textAlign: "center" }}>Invited guest</Typography>
                {meeting?.guests && meeting?.guests?.length > 0 && (
                    <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300" style={{ maxHeight: '300px' }}>
                        <div className="flex justify-between items-center p-4">
                            <Typography fontSize="1.5rem" textAlign="center">Name</Typography>
                            <Typography fontSize="1.5rem">Email</Typography>
                        </div>
                        {meeting?.guests?.map((g) => (
                            <ShowGuest key={g.id} name={g.name} id={g.id} email={g.email} meeting={meeting} />
                        ))}
                    </div>
                )}
                {!meeting?.guests || meeting.guests.length <= 0 && (
                    <Typography variant="subtitle1" textAlign="center">
                        No guests are invited yet
                    </Typography>
                )}
            </div>
        </div>

        
        <div style={{height:'100vh',padding:'1rem'}}>
        <Typography variant="h4" style={{ textAlign: "center" }}>Invite Guests</Typography>
        {
            
            guests.length > 0 && <>
                <div style={{ display: "flex", justifyContent: "space-between", gap: '3rem', alignItems: 'center',padding:'1rem'}}>
                    <Typography fontSize={'1.5rem'} textAlign={"center"}>Name</Typography>
                    <Typography fontSize={'1.5rem'}>Email</Typography>
                    <Typography fontSize={'1.5rem'}>Invite</Typography>
                </div>{
                guests.map((g) => (
                    <ShowGuest name={g.name} id={g.id} email={g.email} meeting={meeting} buttonNeed />
                ))
            }
            </>
        }
        {
            guests.length <= 0 && <Typography variant="subtitle1" textAlign={'center'}>
                you invited all the registerd guests
            </Typography>
        }
        </div>

        

    </div>
}
export default Meeting;
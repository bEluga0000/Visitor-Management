import { Avatar } from "@/components/Avatar";
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
    const [meetingTime,setMeetingTime] = useState("")
    const [meetingDate,setMeetingDate] = useState("")
    const monthArray = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
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
                let date = res1.data.date.split("T")[0]
                const monthIndex = parseInt(date.split('-')[1]) - 1;
                let month = monthArray[monthIndex]
                setMeetingDate(`${month} ${date.split('-')[2]} ${date.split('-')[0]}`)
                let time = res1.data.starttime.split(':')
                let timeHour = parseInt(time[0]) > 12 ? time[0]-12 : time[0]
                let ampm = parseInt(time[0]) >= 12 ? 'pm' : 'am'
                setMeetingTime(`${timeHour}.${time[1]}  ${ampm}`)
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
    // const onSubmit = 
    if (isLoading) {
        return <CircularProgress />
    }
    return <div style={{ minHeight: '90vh' }}>
        <div className="flex flex-col md:flex-row" style={{ minHeight: '90vh', width: '100wh', padding: '5px' }}>
            <div className="flex flex-col w-full md:w-1/2  p-2 " style={{ justifyContent: 'center', alignItems: 'center',minHeight:'90vh' }}>
                <div style={{ padding: '2rem 3rem', backgroundColor: 'whitesmoke' }} className="border-2 rounded-md shadow-lg">
                    <Typography variant="h4" style={{ textAlign: "center", paddingBottom: '1rem' }} fontWeight={600}>Meeting Details</Typography>
                    <div className="flex flex-col gap-4 mt-4" style={{ textAlign: 'center' }}>
                        <Typography fontSize="lg" style={{ textAlign: "center" }}> {meeting?.topic}</Typography>
                        <Typography fontSize="lg" >
                            on {meetingDate }</Typography>
                        <Typography fontSize="lg" className="" style={{ textAlign: "center" }}>
                            hosted By {meeting?.worker?.name}</Typography>
                        <Typography fontSize="lg" className="" style={{ textAlign: "center" }}>
                            Starts from {meetingTime} </Typography>
                        <Typography fontSize="lg" className="" style={{ textAlign: "center" }}>
                            Place {meeting?.location}</Typography>
                        <Typography fontSize="lg" className="" style={{ textAlign: "center" }}>
                            Allocated parking area {meeting?.parkingLocation ? meeting.parkingLocation : 'Building parking area'} </Typography>
                    </div>
                </div>
            </div>

            <div className="flex  w-full md:w-1/2 flex-col md:flex-row" style={{minHeight:'90vh'}}>
                <div className=" flex w-full md:w-1/2" style={{minHeight:'90vh',alignItems:'center',justifyContent:'center'}}>
                    <div className="bg-neutral-800 rounded-xl p-4 w-80 md:w-60" style={{ height: '70vh', overflowY: 'auto' }}>
                        <h2 className="text-white tex-xl font-semibold">
                            Invited Guests
                        </h2>
                        {meeting?.guests && meeting?.guests?.length > 0 && <div className="flex flex-col gap-6 mt-4">
                                {meeting?.guests?.map((g) => {
                                    return <div className="flex flex-row gap-4
                    " >
                                        <Avatar />
                                        <div className="flex flex-col">
                                            <p className="text-white font-semibold text-sm">
                                                {g.name}
                                            </p>
                                            <p className="text-neutral-400 text-sm">
                                                {g.email}
                                            </p>
                                        </div>
                                    </div>
                                })}
                            </div>
                        }
                        {!meeting?.guests || meeting.guests.length <= 0 && (
                            <div className="flex flex-row gap-4
                    " >
                                No guests are invited
                            </div>
                        )}
                    </div>
                </div >
                <div className="flex w-full md:w-1/2" style={{ minHeight: '90vh', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="bg-neutral-800 rounded-xl p-4 w-80 md:w-80" style={{ height: '70vh', overflowY: 'auto' }}>
                        <h2 className="text-white tex-xl font-semibold">
                             Send Invitation
                        </h2>
                        {guests.length > 0 && <div className="flex flex-col gap-6 mt-4">
                            {guests.map((g) => {
                                return <ShowGuest name={g.name} id={g.id} email={g.email} meeting={meeting}  />
                            })}
                        </div>
                        }
                        {guests.length <=0  && (
                            <div className="flex flex-row gap-4
                    " >
                                you invited all the registerd guests
                            </div>
                        )}
                    </div>
                </div >
            </div>
        </div>


        {/* <div style={{ height: '100vh', padding: '1rem' }}>
            <Typography variant="h4" style={{ textAlign: "center" }}>Invite Guests</Typography>
            {

                guests.length > 0 && <>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: '3rem', alignItems: 'center', padding: '1rem' }}>
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
        </div> */}



    </div>
}
export default Meeting;

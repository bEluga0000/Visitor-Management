import { Button } from "@/components/Button";
import { Bar } from "@/components/guestsCompos/Bar";
import { useGuestRegModal } from "@/hooks/useguestRegModal";
import { useLoginModal } from "@/hooks/useLoginModa";
import { useRegisterModal } from "@/hooks/useRegisterModal";
import { idState, isLoadingState, nameState } from "@/store/selectors/userSelectors";
import { CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";

export default function guestHome() {
    const router = useRouter()
    const guestRegModal = useGuestRegModal()
    // const handelClick = useCallback(() => {
    //     console.log("i am getting called")
    //     guestRegModal.onOpen()
    // }, [guestRegModal])
    const guestId = useRecoilValue(idState)
    const isLoading = useRecoilValue(isLoadingState)
    const username = useRecoilValue(nameState)
    if (isLoading) {
        return <CircularProgress />
    }
    return <>
        {
            !username && <div style={{ minHeight: '90vh', textAlign: 'center', display: 'flex', justifyContent: "center", alignItems: 'center', backgroundColor: '#EEF0E5' }} className="flex-wrap w-full">
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center', minHeight: '90vh' }} className="w-full md:w-full lg:w-1/2 xl:w-1/2">
                <Typography variant="h4" fontWeight={700} fontFamily={'sans-serif'}>
                    Skip the queue .
                </Typography>
                <Typography variant="h4" fontWeight={700} fontFamily={'sans-serif'}>
                    and make waiting more enjoyable<span style={{ color: 'green' }}> by registering now </span> .
                </Typography>
                <div style={{ marginTop: '2rem' }}>
                    <Button label="Register" onclick={() => {
                        guestRegModal.onOpen()
                    }} outline large secondary></Button>
                </div>
                <div style={{ marginTop: '5rem' }}>
                    <Typography display={'inline'}>Emplyoee?  </Typography>
                     <a href="/" style={{
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        color: 'blue',
                        fontSize: '1.2rem',
                        fontWeight: 'bold'
                    }}>Login From  Here</a>
                </div>
                </div>
                <div className="w-full md:w-full lg:w-1/2 xl:w-1/2 min-h-screen flex items-center justify-center text-center" style={{ minHeight: '90vh', flexDirection: 'column',paddingLeft:'.5rem' }}>
                    <Typography variant="h2" width={'100wh'} marginBottom={'2rem'}> How it works</Typography>
                    <ul>
                        <div style={{ marginBottom: '1.5rem' }}>
                        <li ><Typography textAlign={"left"} fontSize={'26px'}>1. Login/Register yourself as visitor </Typography></li>
                        <Typography textAlign={"left"}>* Note Enter your email to check how invitation looks like</Typography>
                        </div>
                        <li style={{ marginBottom: '1.5rem' }}><Typography textAlign={"left"} fontSize={'26px'}>2. Invitations are going to be sent to your registerd Email by company emails</Typography></li>
                        <li style={{ marginBottom: '1.5rem' }}><Typography textAlign={"left"} fontSize={'26px'}>4. Scan Qr code sent in the invitation get your badges and skip the Queue</Typography></li>
                        <div>
                        <li ><Typography textAlign={"left"} fontSize={'26px'} color={'gray'}>5. Your going to be notified as the invitation sent</Typography></li>
                        <Typography textAlign={"left"} paddingLeft={'.2rem'}> note: We are working on this notifications</Typography>
                        </div>
                        
                    </ul>
                </div>
            </div>
        }
        { 
                username && <div style={{
                    minHeight: '90vh', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center', paddingTop: '1rem', paddingBottom: '1rem', background: 'linear-gradient(300deg, #00bfff, #4cff73, #ef8172)',
                    backgroundSize: '180% 180%',
                    // animation: 'gradient-animation 5s ease infinite'
                }}>
                <Typography fontSize={'2rem'} fontWeight={700}>Skip the lines, get badges, and enhance your experience by scanning QR codes</Typography>
                    {/* {hostId} */}
                    <div className="flex flex-wrap w-full gap-5 p-4 " style={{ justifyContent: 'space-evenly' }}>
                        <div className="w-full md:w-full lg:w-1/2 xl:w-1/5 p-4 border transition-transform transform hover:shadow-2xl" style={{ backgroundColor: '#F6F5F5', borderRadius: '1rem', alignItems: 'center', display: 'flex', flexDirection: 'column', cursor: 'pointer' }} onClick={() => {
                            router.push(`/guests/up/${guestId}`)
                        }}>
                            <img src="https://www.swipedon.com/hs-fs/hubfs/icons/icon-circle-arrow.png?width=105&height=105&name=icon-circle-arrow.png" alt="Image 1" className="mb-2 rounded-md" />
                            <Typography variant="h4" className="text-lg font-semibold mb-2" marginTop={'1rem'}>Upcoming meetings</Typography>
                        <Typography variant="subtitle1" className="text-sm text-gray-600">Stay informed about your upcoming meetings with notifications and detailed schedules</Typography>
                        </div>
                        <div className="w-full md:w-full lg:w-1/2 xl:w-1/5 p-4 border transition-transform transform hover:shadow-2xl" style={{ backgroundColor: '#F6F5F5', borderRadius: '1rem', alignItems: 'center', display: 'flex', flexDirection: 'column', cursor: 'pointer' }} onClick={() => {
                            router.push(`/guests/all/${guestId}`)
                        }}>
                            <img src="https://www.swipedon.com/hs-fs/hubfs/icons/icon-circle-lightbulb.png?width=105&height=105&name=icon-circle-lightbulb.png" alt="Image 1" className="mb-2 rounded-md" />
                        <Typography variant="h4" className="text-lg font-semibold mb-2" marginTop={'1rem'} >All invited meetings</Typography>
                        <Typography variant="subtitle1" className="text-sm text-gray-600">Explore and manage the meetings you've been invited to for seamless coordination and attendance</Typography>
                        </div>
                        <div className="w-full md:w-full lg:w-1/2 xl:w-1/5 p-4 border transition-transform transform hover:shadow-2xl" style={{ backgroundColor: '#F6F5F5', borderRadius: '1rem', alignItems: 'center', display: 'flex', flexDirection: 'column', cursor: 'pointer' }} onClick={() => {
                            router.push(`/guests/no/${guestId}`)
                        }}>
                            <img src="https://www.swipedon.com/hs-fs/hubfs/icons/icon-circle-bell.png?width=105&height=105&name=icon-circle-bell.png" alt="Image 1" className="mb-2 rounded-md" />
                            <Typography variant="h4" className="text-lg font-semibold mb-2" marginTop={'1rem'}>notifications</Typography>
                        <Typography variant="subtitle1" className="text-sm text-gray-600">Stay informed with notifications, ensuring you never miss important updates or announcements.</Typography>
                        </div>
                    </div>

                </div>
        }
    </>

}


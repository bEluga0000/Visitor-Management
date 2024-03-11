import { Button } from "@/components/Button";
import { useLoginModal } from "@/hooks/useLoginModa";
import { useRegisterModal } from "@/hooks/useRegisterModal";
import { idState, isLoadingState, nameState, roleState } from "@/store/selectors/userSelectors";
import { CircularProgress, Typography } from "@mui/material";
import { Scale } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";

export default function Home() {
  const registerModal = useRegisterModal()
  const router = useRouter()
  const loginModal = useLoginModal()
  const hostId = useRecoilValue(idState)
  const handelClick = useCallback(() => {
    loginModal.onOpen()
  }, [registerModal, loginModal])
  const isLoading = useRecoilValue(isLoadingState)
  const username = useRecoilValue(nameState)
  const isGuest = useRecoilValue(roleState)
  if (isLoading) {
    return <CircularProgress />
  }
  return <>
    {
      !username && <div style={{ minHeight: '90vh', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center', backgroundColor:'#EEF0E5'}}>
        <Typography variant="h2" fontWeight={700} fontFamily={'sans-serif'}>
          Life is complicated.
        </Typography>
        <Typography variant="h2" fontWeight={700} fontFamily={'sans-serif'}>
          Your <span style={{color:'green'}}>workplace sign in </span> shouldn't be.
        </Typography>
        <div style={{ marginTop: '1rem' }}>
          <Button label="Sigin" onclick={() => {
            loginModal.onOpen()
          }} outline large secondary></Button>
        </div>
        <div style={{marginTop:'1rem'}}>
          <Typography display={'inline'}>Guest? </Typography> 
          <a href="/guests" style={{
            textDecoration: 'underline',
            cursor: 'pointer',
            color: 'blue',
            fontSize: '1.2rem',
            fontWeight: 'bold'
          }}>Register Here</a>
        </div>
      </div>
    }
    {
      username && isGuest && router.push("/guests")
    }
    {
      username && <div style={{
        minHeight: '90vh', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center', paddingTop: '1rem', paddingBottom: '1rem', background: 'linear-gradient(300deg, #00bfff, #4cff73, #ef8172)',
        backgroundSize: '180% 180%',
        }}>
        <Typography fontSize={'2.5rem'} fontWeight={700}>Automate your visitor sign in and free up your staff</Typography>
        <div className="flex flex-wrap w-full gap-5 p-4 " style={{justifyContent:'space-evenly'}}>
          <div className="w-full md:w-full lg:w-1/2 xl:w-1/5 p-4 border transition-transform transform hover:shadow-2xl" style={{ backgroundColor: '#F6F5F5', borderRadius: '1rem', alignItems: 'center', display: 'flex', flexDirection: 'column', cursor: 'pointer' }} onClick={() => {
            router.push("/sendInvitations")
          }}>
            <img src="https://www.swipedon.com/hs-fs/hubfs/icons/icon-circle-arrow.png?width=105&height=105&name=icon-circle-arrow.png" alt="Image 1" className="mb-2 rounded-md" />
            <Typography variant="h4" className="text-lg font-semibold mb-2" marginTop={'1rem'}>Send Registration Link</Typography>
            <Typography variant="subtitle1" className="text-sm text-gray-600">Allow visitors to register themselves if they haven't already </Typography>
          </div>
          <div className="w-full md:w-full lg:w-1/2 xl:w-1/5 p-4 border transition-transform transform hover:shadow-2xl" style={{ backgroundColor: '#F6F5F5', borderRadius: '1rem', alignItems: 'center', display: 'flex', flexDirection: 'column', cursor: 'pointer' }} onClick={()=>{
            router.push(`/worker/meetings/${hostId}`)
          }}>
            <img src="https://www.swipedon.com/hs-fs/hubfs/icons/icon-circle-lightbulb.png?width=105&height=105&name=icon-circle-lightbulb.png" alt="Image 1" className="mb-2 rounded-md" />
            <Typography variant="h4" className="text-lg font-semibold mb-2" marginTop={'1rem'} >Meetings</Typography>
            <Typography variant="subtitle1" className="text-sm text-gray-600">You have total visibility of who has been on your premises </Typography>
          </div>
          <div className="w-full md:w-full lg:w-1/2 xl:w-1/5 p-4 border transition-transform transform hover:shadow-2xl" style={{ backgroundColor: '#F6F5F5', borderRadius: '1rem', alignItems: 'center', display: 'flex', flexDirection: 'column', cursor: 'pointer' }} onClick={()=>{
            router.push("/worker/createMeeting")
          }}>
            <img src="https://www.swipedon.com/hs-fs/hubfs/icons/icon-circle-bell.png?width=105&height=105&name=icon-circle-bell.png" alt="Image 1" className="mb-2 rounded-md" />
            <Typography variant="h4" className="text-lg font-semibold mb-2" marginTop={'1rem'}>Create Meetings</Typography>
            <Typography variant="subtitle1" className="text-sm text-gray-600">Record a secure digital entry for emergencies and audits by creating a meeting</Typography>
          </div>
          <div className="w-full md:w-full lg:w-1/2 xl:w-1/5 p-4 border transition-transform transform hover:shadow-2xl" style={{ backgroundColor: '#F6F5F5', borderRadius: '1rem', alignItems: 'center', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
            <img src="https://www.swipedon.com/hs-fs/hubfs/icons/icon-circle-shield.png?width=105&height=105&name=icon-circle-shield.png" alt="Image 1" className="mb-2 rounded-md" />
            <Typography variant="h4" className="text-lg font-semibold mb-2" marginTop={'1rem'}>Up to date records</Typography>
            <Typography variant="subtitle1" className="text-sm text-gray-600">A digital record is securely stored for emergencies and audits</Typography>
          </div>
        </div>
        
      </div>
    }
  </>

}


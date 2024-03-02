import { Button } from "@/components/Button";
import { NavBar } from "@/components/NavBar";
import { useLoginModal } from "@/hooks/useLoginModa";
import { useRegisterModal } from "@/hooks/useRegisterModal";
import { isLoadingState, nameState } from "@/store/selectors/userSelectors";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";

export default function Home() {
  const registerModal = useRegisterModal()
  const router = useRouter()
  const loginModal = useLoginModal()
  const handelClick = useCallback(()=>{
    loginModal.onOpen()
  },[registerModal,loginModal])
  const isLoading = useRecoilValue(isLoadingState)
  const username = useRecoilValue(nameState)
  if(isLoading)
  {
    return <CircularProgress/>
  }
  return <>
    {
      !username && <div style={{ width: '100wh', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: "column", gap: '3rem' }}>
        <h1 className="text-lime-600 text-4xl text-center font-bold">
          Lets make your crowd queue happly
        </h1>
        <Button label="Login" onclick={handelClick} outline large secondary></Button>
      </div>
    }
    {
      username && <div style={{ width: '100wh', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: "column", gap: '3rem' }}>
        <h1 className="text-lime-600 text-4xl text-center font-bold">
          Lets make your crowd queue happly
        </h1>
        <Button label="Send Invitations" onclick={()=>{
          router.push("/sendInvitations")
        }} outline large secondary></Button>
      </div>
    }
  </>
  
}


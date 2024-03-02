import { Button } from "@/components/Button";
import { Bar } from "@/components/guestsCompos/Bar";
import { useGuestRegModal } from "@/hooks/useguestRegModal";
import { useLoginModal } from "@/hooks/useLoginModa";
import { useRegisterModal } from "@/hooks/useRegisterModal";
import { isLoadingState, nameState } from "@/store/selectors/userSelectors";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";


export default function guestHome() {
    const router = useRouter()
    const guestRegModal = useGuestRegModal()
    const handelClick = useCallback(() => {
        console.log("i am getting called")
        guestRegModal.onOpen()
    }, [guestRegModal])
    const isLoading = useRecoilValue(isLoadingState)
    const username = useRecoilValue(nameState)
    if (isLoading) {
        return <CircularProgress />
    }
    return <>
        {
            !username && <div style={{ width: '100wh', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: "column", gap: '3rem' }}>
                <h1 className="text-lime-600 text-4xl text-center font-bold">
                    Please Login to see Your upcoming Meetings
                </h1>
                <Button label="Register" onclick={handelClick} outline large secondary></Button>
            </div>
        }
        {
            username && <> 
            <Bar/>
            <div style={{ width: '100wh', height: '100vh', display: 'flex', flexDirection: "column", gap: '3rem' }}>
                <div>
                    <h1 className="text-lime-600 text-4xl text-center font-bold">
                        Upcoming Meetings
                    </h1>
                </div>
                
                {/* //?we dont need the button here if needed use it */}
                {/* <Button label="Send Invitations" onclick={() => {
                    router.push("/sendInvitations")
                }} outline large secondary></Button> */}
            </div>
            </>
        }
    </>

}


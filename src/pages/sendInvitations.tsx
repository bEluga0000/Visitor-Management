import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { idState, isLoadingState, roleState } from "@/store/selectors/userSelectors";
import { Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useRecoilValue } from "recoil";

const SendInvitations = ()=>{
    const [guestEmail,setGuestEmail] = useState<string>("")
    const[isLoading,setIsLoading] = useState<boolean>(true)
    const[sending,setSending] = useState(false)
    const userId = useRecoilValue(idState)
    const router = useRouter()
    useEffect(()=>{
        console.log(guestEmail.length)
        if(guestEmail.length>0)
        {
            setIsLoading(false)
        }
        else
        {
            setIsLoading(true)
        }
    },[guestEmail,isLoading,userId])
    useEffect(() => {
        if (localStorage.getItem('userId') && localStorage.getItem('guest')) {
            router.push('/guests');
        }
        if (!localStorage.getItem('userId') && !localStorage.getItem('guest')) {
            router.push('/');
        }
    }, []);
    const onSubmit = useCallback(async ()=>{
        
        try{
            setSending(true)
            const res = await axios.post("api/sendMails/registration",{
                email:guestEmail
            })
            if(res.data)
            {
                toast.success("Mail Sent Successfully");
            }
            else
            {
                throw new Error ("Error while sending mail")
            }
        }
        catch(e)
        {
            console.log(e)
            toast.error("Something Went Wrong")
        }
        finally
        {
            setSending(false)
        }
    },[guestEmail])
    return <div style={{ width: '90wh', height: '90vh',alignItems:'center' }} className="flex flex-wrap">
        <div className="w-full md:w-full lg:w-1/2 xl:w-1/2">
            <Typography variant="h4" textAlign={"center"} lineHeight={1.5} style={{ wordSpacing: '0.2em' }}>Allow visitors to register themselves if they haven't already</Typography>
        </div>
        <div className="w-full md:w-full lg:w-1/2 xl:w-1/2 flex" style={{alignItems:"center", flexDirection:'column',gap:'2rem'}}>
            <Input placeholder="Guest Email"
                type="text"
                value={guestEmail}
                width="w-3/5"
                secondry
                onChange={(e) => {
                    setGuestEmail(e.target.value)
                }}></Input>
            <Button label="SendEmail" onclick={onSubmit} outline large secondary disabled={isLoading||sending}
            ></Button>
        </div>
        
    </div>
}
export default SendInvitations;
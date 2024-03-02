import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import axios from "axios";
import { useEffect } from "react";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

const SendInvitations = ()=>{
    const [guestEmail,setGuestEmail] = useState<string>("")
    const[isLoading,setIsLoading] = useState<boolean>(true)
    useEffect(()=>{
        if(guestEmail.length>0)
        {
            setIsLoading(false)
        }
        else
        {
            setIsLoading(true)
        }
    },[guestEmail,isLoading])
    const onSubmit = useCallback(async ()=>{
        setIsLoading(true)
        try{
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
            setIsLoading(false)
        }
    },[guestEmail])
    return <div style={{ width: '100wh', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3rem' }}>
        <Input placeholder="Guest Email" 
        type="text" 
        value={guestEmail}
            width="w-3/5"
        secondry
         onChange={(e)=>{
            setGuestEmail(e.target.value)
        }}></Input>
        <Button label="SendEmail" onclick={onSubmit} outline large secondary disabled={isLoading}
        ></Button>
    </div>
}
export default SendInvitations;
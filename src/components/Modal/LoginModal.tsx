import { useLoginModal } from "@/hooks/useLoginModa"
import { useRegisterModal } from "@/hooks/useRegisterModal"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useCallback } from "react"
import { toast } from "react-toastify"
import { Input } from "../Input"
import Modal from "../Modal"

export const LoginModal = ()=>{
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading,setIsloading] = useState<boolean>(false)
    const[cEmail,setCemail] = useState<string>("")
    const[password,setPassword] = useState<string>("")
    const onToogle = useCallback(()=>{
        if(isLoading)
        {
            return ;
        }
        else
        {
            loginModal.onClose()
            registerModal.onOpen()
        }
    },[loginModal,isLoading,registerModal])
    const onsubmit  = useCallback(()=>{
        try{
            setIsloading(true)            
            signIn('credentials',{
                email:cEmail,
                password
            })
            toast.success("LoggedIn successfully")
            loginModal.onClose()

        }
        catch(e)
        {
            console.error(e)
            toast.error("Something went wrong")
        }
        finally{
            setIsloading(false)
        }
    },[loginModal,isLoading,cEmail,password])
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Email"
                onChange={(e) => setCemail(e.target.value)}
                value={cEmail}
                disabled={isLoading} />
            <Input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading} />
        </div>
    )
    const footerContent = (
        <div>
            <p className="
        text-neutral-400
        text-center
        mt-4">New to Here? <span className="text-white
                cursor-pointer
                hover:underline" onClick={onToogle}>
                    &nbsp;Register</span></p>
        </div>
    )    
    return <div>
        <Modal disabled={isLoading} onsubmit={onsubmit} onclose={loginModal.onClose} body={bodyContent} footer={footerContent}
        actionLabel="Sigin" title="Welcome Back"
        isOpen={loginModal.isOpen}></Modal></div>
}
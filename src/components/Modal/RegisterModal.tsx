import { useLoginModal } from "@/hooks/useLoginModa"
import { useRegisterModal } from "@/hooks/useRegisterModal"
import { useCallback } from "react"
import { useState } from "react"
import { toast } from "react-toastify"
import { Input } from "../Input"
import Modal from "../Modal"

export const RegisterModal = ()=>{
    const[cName,setCname] = useState<string>("")
    const[cMail,setCmail] = useState<string>("")
    const[password,setPassword] = useState<string>("")
    const[isLoading,setIsLoading] = useState<boolean>(false)
    const registerModal = useRegisterModal();
    const LoginModal = useLoginModal();
    const onToggle = useCallback(()=>{
        if(isLoading)
        {
            return;
        }
        else
        {
            registerModal.onCLose()
            LoginModal.onOpen()

        }
    },[isLoading,registerModal,LoginModal])
    const onsubmit = useCallback(()=>{
        try{
            setIsLoading(true)
            // todo need to sigup logic
            toast.success("Accont Created")
            registerModal.onCLose()
        }
        catch(e)
        {
            console.error(e)
            toast.error('Looser correct the code')
        }
        finally
        {
            setIsLoading(false)
        }
    },[registerModal])
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Company Name"
                onChange={(e) => setCname(e.target.value)}
                value={cName}
                disabled={isLoading} />
            <Input
                placeholder="Company Email"
                onChange={(e) => setCmail(e.target.value)}
                value={cMail}
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
        <div className="
        text-neutral-400
        text-center
        mt-4">
            <p>Already Have accont?
                <span className="text-white
                cursor-pointer
                hover:underline"onClick={onToggle}>
                    &nbsp;SignIn
                </span>
            </p>
        </div>
    )
    return <div>
        <Modal title="Create An Account" 
        actionLabel="Register"
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        onsubmit={onsubmit}
        onclose={registerModal.onCLose}
        body={bodyContent}
        footer={footerContent}
        ></Modal>
    </div>
}
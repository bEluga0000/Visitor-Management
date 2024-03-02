import { useLoginModal } from "@/hooks/useLoginModa"
import { useRegisterModal } from "@/hooks/useRegisterModal"
import axios from "axios"
import { useCallback} from "react"
import { useState } from "react"
import toast from "react-hot-toast"
import { Input } from "../Input"
import Modal from "../Modal"
import {signIn} from "next-auth/react"

export const RegisterModal = ()=>{
    const[cName,setCname] = useState<string>("")
    const[cMail,setCmail] = useState<string>("")
    const[password,setPassword] = useState<string>("")
    const[isLoading,setIsLoading] = useState<boolean>(false)
    const registerModal = useRegisterModal();
    const LoginModal = useLoginModal();
    const onToggle = useCallback(async ()=>{
        if(isLoading)
        {
            return;
        }
        else
        {
            registerModal.onCLose()
            LoginModal.onOpen()

        }
    },[isLoading,registerModal,LoginModal,cName])
    const onsubmit = useCallback(async () => {
        
        try {
            console.log(cName)
            setIsLoading(true)
            await axios.post('/api/worker/register', {
                email: cMail,
                password,
                name: cName
            })
            toast.success('Accont Created')
            signIn('credentials', {
                email: cMail,
                password
            })

            registerModal.onCLose()
        }
        catch (err) {
            console.error(err)
            toast.error('Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }, [isLoading, registerModal, cName,cMail,password])
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Name"
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
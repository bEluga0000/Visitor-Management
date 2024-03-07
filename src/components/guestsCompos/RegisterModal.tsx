import { useGuestLogModal } from "@/hooks/useGuestLogModal"
import { useGuestRegModal } from "@/hooks/useguestRegModal"
import axios from "axios"
import { signIn } from "next-auth/react"
import { useCallback, useEffect } from "react"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { ImageUpload } from "../imageUpload"
import { Input } from "../Input"
import Modal from "../Modal"

export const GuestRegisterModal = ()=>{
    const [email,setEmail] = useState<string>("")
    const [name,setName] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const [idImage,setIdImage] = useState("")
    const [isLoading,setIsLoading] = useState(false)
    const guestRegModal = useGuestRegModal()
    const guestLogModal = useGuestLogModal()
    const onToogle = useCallback(() => {
        if (isLoading) {
            return;
        }
        else {
            guestRegModal.onClose()
            guestLogModal.onOpen()
        }
    }, [guestLogModal, isLoading,guestRegModal])
    const onSubmit = useCallback(async()=>{
        if (email.length <= 1 || name.length <= 1 || password.length <= 1 || idImage.length <= 1) {
            toast.error("Please enter all the detatils")
            return;
        }
        // todo need to add the guest register account
        try
        {
            setIsLoading(true)
            await axios.post('/api/guest/register', {
                email,
                password,
                name,
                idImage
            })
            toast.success('Accont Created')
            signIn('credentials', {
                email,
                password,
                worker: 'no'
            })

            guestRegModal.onClose()
        }
        catch(e)
        {
            console.log(e)
        }
        finally{
        }
    }, [email, name, password, idImage])
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
                />
            <Input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading} />
            <Input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading} />
            <ImageUpload value={idImage} disabled={isLoading} onChange={(image) => setIdImage(image)} label="Upload profile image" />
        </div>
    )
    const footerContent = (
        <div>
            <p className="
        text-neutral-400
        text-center
        mt-4">Already Have accont? <span className="text-white
                cursor-pointer
                hover:underline" onClick={onToogle}>
                    &nbsp;SignIn</span></p>
        </div>
    )
    return <div>
        <Modal disabled={isLoading}
        title="Register yourself"
        onclose={guestRegModal.onClose}
        actionLabel="Register"
        isOpen={guestRegModal.isOpen}
        onsubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}/>
    </div> 
}
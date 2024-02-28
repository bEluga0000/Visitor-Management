import React, { useCallback } from "react";
import { Button } from "./Button";
import { AiOutlineClose } from "react-icons/ai"
interface ModalProps{
    isOpen?:boolean
    onclose:()=> void
    onsubmit:()=> void
    title?:string
    body?:React.ReactElement
    footer?:React.ReactElement
    actionLabel:string
    disabled?:boolean
}
const Modal = ({
    isOpen,
    onclose,
    onsubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled
}:ModalProps) => {
    const handelClose = useCallback(()=>{
        if(disabled)
        {
            return ;
        }
        else
        {
            onclose()
        }
    },[disabled,onclose])
    const handelSubmit = useCallback(()=>{
        if(disabled)
        {
            return;
        }
        else
        {
            onsubmit();
        }
    },[])
    if(!isOpen)
    {
        return null
    }
   return <>
        <div className="
        justify-center
        items-center
        flex
        overflow-x-hidden
        fixed
        inset-0
        z-50
        outline-none
        focus:outline-none
        bg-neutral-800
        bg-opacity-70
        ">
            <div className="
            
            relative
            w-full
            lg:w-3/6
            my-1
            mx-auto
            lg:max-w-3xl
            h-full
            lg:h-auto
            
            ">
                <div className="

                h-full
                lg:h-auto
                border-0
                rounded-lg
                shadow-lg
                relative
                flex
                flex-col
                w-full
                bg-black
                outline-none
                focus:outline-none
                ">
                    <div className="
                    flex
                    items-center
                    justify-between
                    px-10
                    py-5
                    rounded-t">
                        <h3 className="
                        text-3xl
                        font-semibold
                        text-white">
                            {title}
                        </h3>
                        <button
                            onClick={handelClose} className="
                        p-1
                        ml-auto
                        border-0
                        text-white
                        hover:opacity-70 transition">
                            <AiOutlineClose size={20}
                            />
                        </button>
                    </div>
                    <div className="
                    relative
                    px-10
                    flex-auto">
                        {body}
                    </div>
                    <div className="
                    flex
                    flex-col
                    gap-1
                    px-10
                    py-2">
                        <Button disabled={disabled}
                            label={actionLabel}
                            secondary
                            fullWidth large
                            onclick={handelSubmit} />
                        {footer}
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default Modal;
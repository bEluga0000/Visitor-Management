import { create } from "zustand";
interface guestRegisterModalStore{
    isOpen:boolean,
    onOpen:()=> void
    onClose:()=>void
}
export const useGuestRegModal = create<guestRegisterModalStore>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=> set({isOpen:false})
}))
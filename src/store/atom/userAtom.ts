import { atom } from "recoil";
export const userState = atom<{name:string|null,email:string|null,id:string|null,isLoading:boolean}>({
    key:"userState",
    default:{
        name:null,
        email:null,
        id:null,
        isLoading:true
    }
})
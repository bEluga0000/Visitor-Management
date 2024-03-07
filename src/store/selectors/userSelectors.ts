import { selector } from "recoil";
import { userState } from "../atom/userAtom";

export const nameState = selector({
    key:'nameSate',
    get:({get})=>{
        const state = get(userState)
        return state.name
    }
})

export const emailState = selector({
    key:'emailState',
    get:({get})=>{
        const state = get(userState)
        return state.email
    }
})
export const idState = selector({
    key:'idState',
    get:({get})=>{
        const state = get(userState)
        return state.id
    }
})
export const isLoadingState = selector({
    key:'isLoadingState',
    get:({get})=>{
        const state = get(userState)
        return state.isLoading
    }
})
export const roleState = selector({
    key:"roleState",
    get:({get})=>{
        const state = get(userState)
        return state.worker
    }
})
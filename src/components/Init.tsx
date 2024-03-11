import { userState } from "@/store/atom/userAtom"
import { idState } from "@/store/selectors/userSelectors"
import axios from "axios"
import { useEffect } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"

export const Init= ()=>{
    const setCurrentUser = useSetRecoilState(userState)
    const userExist = useRecoilValue(idState)
    useEffect(() => {
        const init = async () => {
            try {
                if(userExist)
                {
                    return ;
                }
                const res = await axios.get("/api/currentUser")
                if (!res.data) {
                    console.log("i am running")
                    setCurrentUser({
                        email: null,
                        id: null,
                        name: null,
                        isLoading: false,
                        worker: null
                    })
                    
                }
                else {
                    const currentWorker = res.data
                    setCurrentUser({
                        email: currentWorker.email,
                        id: currentWorker.id,
                        name: currentWorker.name,
                        isLoading: false,
                        worker: currentWorker.guest
                    })
                    localStorage.setItem('userId',res.data.id);
                    localStorage.setItem('isGuest',res.data.guest)
                }
            }
            catch (e) {
                console.log(e)
                setCurrentUser({
                    email: null,
                    id: null,
                    name: null,
                    isLoading: false,
                    worker: null
                })
            }

        }
        init();
    }, [])
    return <></>
}
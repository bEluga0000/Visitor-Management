import { userState } from "@/store/atom/userAtom"
import axios from "axios"
import { useEffect } from "react"
import { useSetRecoilState } from "recoil"

export const Init= ()=>{
    const setCurrentUser = useSetRecoilState(userState)
    useEffect(() => {
        console.log("I am running")
        const init = async () => {
            try {
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
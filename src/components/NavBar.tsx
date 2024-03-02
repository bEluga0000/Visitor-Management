import { isLoadingState, nameState } from "@/store/selectors/userSelectors"
import { CircularProgress, Typography } from "@mui/material"
import axios from "axios"
import { userState } from "@/store/atom/userAtom";
import { useEffect } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { Button } from "./Button"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useLoginModal } from "@/hooks/useLoginModa"
import { useRegisterModal } from "@/hooks/useRegisterModal"
import { useCallback } from "react"
// import { ClipLoader } from "react-spinners"

export const NavBar = () => {
    const setCurrentUser = useSetRecoilState(userState)
    const router = useRouter()
    const userLoading = useRecoilValue(isLoadingState)
    const username = useRecoilValue(nameState)
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
    useEffect(() => {
        console.log("I am running")
        const init = async () => {
            console.log(username)
            try {


                const res = await axios.get("/api/currentUser")
                if (!res.data) {
                    console.log("i am running")
                    setCurrentUser({
                        email: null,
                        id: null,
                        name: null,
                        isLoading: false
                    })
                }
                else {
                    const currentWorker = res.data
                    setCurrentUser({
                        email: currentWorker.email,
                        id: currentWorker.id,
                        name: currentWorker.name,
                        isLoading: false
                    })
                    console.log(username, currentWorker)
                }
            }
            catch(e)
            {
                console.log(e)
                setCurrentUser({
                    email: null,
                    id: null,
                    name: null,
                    isLoading: false
                })
            }

        }
        init();
    }, [])
    const singUpButtonOnclick = useCallback(() => {
        if (userLoading) {
            return;
        }
        else {

            registerModal.onOpen()
        }
    }, [registerModal])
    const singInButtonOnclick = useCallback(() => {
        if (userLoading) {
            return;
        }
        else {
            loginModal.onOpen()
        }
    }, [loginModal])

    if (userLoading) {
        return <CircularProgress />
    }
    if (username) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 5px'
            }}>
                <div style={{ marginLeft: 10, cursor: "pointer" }}
                // onClick={() => {
                //     router.push("/")
                // }}
                >
                    <h3 >Company</h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                    <Button label={username} onclick={() => { }}></Button>
                    <Button label="Logout" onclick={() => {
                        setCurrentUser({
                            email: null,
                            id: null,
                            isLoading: false,
                            name: null
                        })
                        router.push("/")
                        signOut()
                    }}></Button>
                </div>
            </div>
        )
    }
    else {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 5px'
            }}>
                <div style={{ marginLeft: 10, cursor: "pointer" }}
                // onClick={() => {
                //     router.push("/")
                // }}
                >
                    <h3>Company</h3>
                </div>
                <div>
                    <Button label="Register" onclick={singUpButtonOnclick}></Button>
                    <Button label="Login" onclick={singInButtonOnclick}></Button>
                </div>
            </div>
        )
    }
}
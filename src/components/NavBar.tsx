import { emailState, isLoadingState, nameState, roleState } from "@/store/selectors/userSelectors"
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
import {  Dropdown, Navbar } from 'flowbite-react';
// import { ClipLoader } from "react-spinners"

export const NavBar = () => {
    const setCurrentUser = useSetRecoilState(userState)
    const router = useRouter()
    const userLoading = useRecoilValue(isLoadingState)
    const username = useRecoilValue(nameState)
    const loginModal = useLoginModal()
    const useremail = useRecoilValue(emailState)
    const isGuest = useRecoilValue(roleState)
    let roleWasGuest = isGuest
    const singInButtonOnclick = useCallback(() => {
        loginModal.onOpen()
    }, [loginModal])

    if (userLoading) {
        return <CircularProgress />
    }
    const handleSignOut = async () => {
        // Clear the current user state
        setCurrentUser({
            email: null,
            id: null,
            isLoading: false,
            name: null,
            worker: null
        });
        localStorage.removeItem('userId',);
        localStorage.removeItem('isGuest');

        // Sign out
        await signOut();
    };

    if (username) {
        return (
            <Navbar fluid rounded style={{ height: '10vh', alignItems: 'center', padding: '.5rem 1rem', zIndex: 1000,position:'relative' }}>
                <Navbar.Brand href="/" style={{ height: '3rem', width: 'auto' }}>
                    <img
                        src="https://www.swipedon.com/hubfs/swipedon-logo-orange.svg"
                        className="mr-3 h-6 sm:h-9"
                        alt="Flowbite React Logo"
                        style={{ height: '100%', width: 'auto', objectFit: 'cover' }}
                    />
                </Navbar.Brand>
                <div className="flex md:order-">
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <div style={{ height: '3rem', width: '3rem', overflow: 'hidden', borderRadius: '50%' }}>
                                <img
                                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                    className="h-full w-full object-cover"
                                    alt="Flowbite React Logo"
                                />
                            </div>
                        }
                    >
                        {/* //todo need to make these things color white and green */}
                        <Dropdown.Header style={{ paddingLeft: '.3rem', backgroundColor: '#2D9596', overflow: 'hidden', color: '#DBE7C9' }}>
                            <span className="block text-sm" >{username}</span>
                            <span className="block truncate text-sm font-medium">{useremail}</span>
                        </Dropdown.Header>
                        <Dropdown.Item onClick={()=> handleSignOut()} style={{cursor:'pointer'}}>Sign out</Dropdown.Item>
                    </Dropdown>
                </div>
            </Navbar>
        );
    }
    else {
        return (
            <Navbar fluid rounded style={{ height: '10vh', alignItems: 'center', padding: '.5rem 1rem' }}>
                <Navbar.Brand href="/" style={{ height: '3rem', width: 'auto' }}>
                    <img
                        src="https://www.swipedon.com/hubfs/swipedon-logo-orange.svg"
                        className="mr-3 h-6 sm:h-9"
                        alt="Flowbite React Logo"
                        style={{ height: '100%', width: 'auto', objectFit: 'cover' }}
                    />
                </Navbar.Brand>
                {/* <div className="flex md:order-">
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <div style={{ overflow: 'hidden' }} onClick={() => { singInButtonOnclick() }}>
                                <button className="w-full h-full text-black border border-black rounded px-6 py-2 text-lg transition hover:bg-green-800 hover:text-white focus:outline-none">
                                    Sign In
                                </button>
                            </div>


                        }
                    >
                    </Dropdown>
                </div> */}
            </Navbar>
        )
    }
}
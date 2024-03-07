import { GuestLoginModal } from "@/components/guestsCompos/LoginModal";
import { GuestRegisterModal } from "@/components/guestsCompos/RegisterModal";
import { Init } from "@/components/Init";
import { LoginModal } from "@/components/Modal/LoginModal";
import { RegisterModal } from "@/components/Modal/RegisterModal";
import { NavBar } from "@/components/NavBar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return <RecoilRoot>
    <SessionProvider session={pageProps.sessions}>
    <Toaster/>
    <Init/>
  <LoginModal/>
   <RegisterModal/>
  <GuestRegisterModal/>
  <GuestLoginModal/>
   <NavBar/>
  <Component {...pageProps} />
    </SessionProvider>
  </RecoilRoot>
}

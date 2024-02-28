import { LoginModal } from "@/components/Modal/LoginModal";
import { RegisterModal } from "@/components/Modal/RegisterModal";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <>
  <LoginModal/>
   <RegisterModal/>
  <Component {...pageProps} />;
  </>
}

import { Button } from "@/components/Button";
import { useLoginModal } from "@/hooks/useLoginModa";
import { useRegisterModal } from "@/hooks/useRegisterModal";
import { useCallback } from "react";

export default function Home() {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const handelClick = useCallback(()=>{
    loginModal.onOpen()
  },[registerModal,loginModal])
  return (
    <>
    <div style={{width:'100wh',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:"column",gap:'3rem'}}>
        <h1 className="text-lime-600 text-4xl text-center font-bold">
          Lets make your crowd queue happly
        </h1>
        <Button label="Login"  onclick={handelClick} outline large secondary></Button>
    </div>
    </>
  );
}


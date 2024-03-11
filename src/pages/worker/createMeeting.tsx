import { Button } from "@/components/Button";
import { CreateMeetingCompo } from "@/components/createMeetingCompo";
import { roleState } from "@/store/selectors/userSelectors"
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

const CreateMeeting = ()=>{
    const isguest:boolean|null = useRecoilValue(roleState);
    const router = useRouter()
    useEffect(() => {
        if (localStorage.getItem('userId') && localStorage.getItem('isGuest') == 'true') {
            router.push('/guests');
        }
        if (!localStorage.getItem('userId') && !localStorage.getItem('isGuest')) {
            router.push('/');
        }
    }, []);
    if(isguest)
    {
        router.replace("/guests")
    }
    else
    {
        return <div style={{ width: '100wh', height: '90vh', display: 'flex', alignItems: 'center',flexDirection: "column",justifyContent:'center'}}>
            <CreateMeetingCompo/>
        </div>
    }
}

export default CreateMeeting
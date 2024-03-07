import { Button } from "@/components/Button";
import { CreateMeetingCompo } from "@/components/createMeetingCompo";
import { roleState } from "@/store/selectors/userSelectors"
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

const CreateMeeting = ()=>{
    const isguest:boolean|null = useRecoilValue(roleState);
    const router = useRouter()
    if(isguest)
    {
        router.replace("/guests")
    }
    else
    {
        return <div style={{ width: '100wh', height: '100vh', display: 'flex', alignItems: 'center',  flexDirection: "column", gap: '3rem' ,padding:'4rem'}}>
            <CreateMeetingCompo/>
        </div>
    }
}

export default CreateMeeting
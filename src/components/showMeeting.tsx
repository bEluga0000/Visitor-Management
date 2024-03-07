import { Button } from "./Button"

interface ShowMeetingProps
{
    id: string
    host?: string
    topic?: string
    date?: string
    guests?: string[]
    location?: string
    parkingLocation?: string | null
    starttime?: string
    endtime?: string
    name?:string
    onclick:()=>void
}
export const ShowMeeting = ({
    id,
    host,
    topic,
    date,
    name,
    onclick
}:ShowMeetingProps)=>{
    console.log(topic)
    return <div style={{display:"flex",width:"100%",justifyContent:"space-between"}}>
        <h3>
            {topic}
        </h3>
        <h5>
            {date}
        </h5>
        {name && <h4>{name}</h4>}
        <Button label="More Deatails" onclick={onclick} secondary/>
    </div>
}
// Here we need to use special Button we created

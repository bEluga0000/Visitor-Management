import { Typography } from "@mui/material"
import { Button } from "./Button"

interface ShowMeetingProps {
    id: string
    host?: string
    topic?: string
    date: string
    guests?: string[]
    location?: string
    parkingLocation?: string | null
    starttime?: string
    endtime?: string
    name?: string
    onclick: () => void
}
export const ShowMeeting = ({
    id,
    host,
    topic,
    date,
    name,
    onclick
}: ShowMeetingProps) => {

    const Fdate = new Date(date)
    const year = Fdate.getFullYear();
    const month = Fdate.getMonth() + 1
    const day = Fdate.getDate();
    const formatedDate = `${day < 0 ? '0' : " "}${day}-${month < 10 ? '0' : ''}${month}-${year}`
    return <div className="flex bg-gray-300 py-4 items-center justify-center my-2" style={{ gap: '.3rem', minHeight: '2rem',margin:'.2rem',borderRadius:'10px'}}>
        <div className="flex-1">
            <Typography variant="h5" className="text-center">{topic}</Typography>
        </div>
        <div className="flex-1">
            <Typography className="text-center" variant="h6">{formatedDate}</Typography>
        </div>
        <div className="flex-1">
            {name && <Typography className="text-center" variant="h6">{name}</Typography>}
        </div>
        <div className="flex-1">
            <Button label="Details" onclick={onclick} secondary fontSize="lg"/>
        </div>
    </div>
}

// Here we need to use special Button we created

import { idState } from "@/store/selectors/userSelectors"
import axios from "axios"
import React from "react"
import { useCallback } from "react"
import { useState } from "react"
import toast from "react-hot-toast"
import { useRecoilValue } from "recoil"
import { Button } from "./Button"
import { Input } from "./Input"

export const CreateMeetingCompo = ()=>{
    const hostId = useRecoilValue(idState)
    const [topic,setTopic] = useState<string>("")
    const [loc,setLoc] = useState<string>("")
    const [date,setDate] = useState<string>("")
    const [startTime,setStartTime] = useState<string>("")
    const [endTime,setEndTime] = useState<string>("")
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const handelSubmit = useCallback(async()=>{
        // console.log(date)

        const dateObject = new Date(date);
        const formattedDate = dateObject.toISOString();
        // console.log(formattedDate)
        try
        {
            const res  =await axios.post("/api/worker/createMeeting",{
                topic,
                loc,
                date:formattedDate,
                starttime:startTime,
                endtime:endTime,
                hostId
            })
            if(res.data)
            {
                console.log(res.data)
                toast.success("meeting created")
            }
            else
            {
                throw new Error ("error in creating the meeting")
            }
        }
        catch(e)
        {
            console.log(e)
            toast.error("Something went wrong")
        }
        // console.log(topic,loc,formattedDate,startTime,endTime)
    },[topic,loc,date,startTime,endTime,hostId])
return <>
        {/* <div className="
        justify-center
        items-center
        flex
        overflow-x-hidden
        fixed
        inset-0
        outline-none
        focus:outline-none
        bg-neutral-800
        bg-opacity-70
        "> */}
            <div className="
            
            relative
            w-full
            lg:w-3/6
            my-1
            mx-auto
            lg:max-w-3xl
            h-full
            lg:h-auto
            
            ">
                <div className="

                h-full
                lg:h-auto
                border-0
                rounded-lg
                shadow-lg
                relative
                flex
                flex-col
                w-full
                bg-black
                outline-none
                focus:outline-none
                ">
                    <div className="
                    flex
                    items-center
                    justify-between
                    px-10
                    py-5
                    rounded-t">
                        <h3 className="
                        text-3xl
                        font-semibold
                        text-white">
                            {"Create Meeting"}
                        </h3>
                    </div>
                    <div className="
                    relative
                    px-10
                    flex-auto">
                        <div className="flex flex-col gap-4">
                            <Input
                                placeholder="Topic"
                                onChange={(e) => setTopic(e.target.value)}
                                value={topic}
                                disabled={isLoading} />
                            <Input
                                placeholder="Loacation"
                                onChange={(e) => setLoc(e.target.value)}
                                value={loc}
                                disabled={isLoading} 
                                />
                            <Input
                                placeholder="Date"
                                onChange={(e) => setDate(e.target.value)}
                                type="date"
                                value={date}
                                disabled={isLoading}
                            />
                            <Input
                                placeholder="Start Time"
                                onChange={(e) => setStartTime(e.target.value)}
                                type="time"
                                value={startTime}
                                disabled={isLoading}
                            />
                            <Input
                                placeholder="End Time"
                                onChange={(e) => setEndTime(e.target.value)}
                                type="time"
                                value={endTime}
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    <div className="
                    flex
                    flex-col
                    gap-1
                    px-10
                    py-2">
                        <Button disabled={isLoading}
                            label={"Create"}
                            secondary
                            fullWidth large
                            onclick={handelSubmit} />
                    </div>
                </div>
            </div>
        {/* </div> */}
    </>
}
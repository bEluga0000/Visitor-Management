import { Button } from "../Button"

export const Bar = ()=>{
    return <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 5px'
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
            <Button label={"Upcoming"} onclick={() => { }} ></Button>
            <Button label="Completed" onclick={() => {
            }}></Button>
            {/* //todo Need to see the twitter clone and work on this */}
            <Button label={"Notificaitons"} onclick={()=>{}}></Button>
        </div>
    </div>
}
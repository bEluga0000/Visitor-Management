import Mailgen from "mailgen";
import generateQR from "../generateQR";
interface meetingInvitationProps
{
    // ? name
    host:string
    date:string
    time:string
    //? try to make google link   
    location:string
    parking:string
    guestId:string
    meetingId:string
}
export default function meetingInvitationFormat({
    host,
    date,
    time,
    location,
    parking,
    guestId,
    meetingId
}:meetingInvitationProps)
{
    let mailGenetor = new Mailgen({
        theme: "default",
        product: {
            name: 'Vsitor.com',
            link: "http://loclhost:3000"
        }
    })
    const eventTitle = 'Meeting with Devs';
    const eventDescription = 'Discussing important matters';
    const eventLocation = 'Shimoga, Karnataka';
    const startDate = '2024-03-15T10:00:00'; // Replace with your start date
    const endDate = '2024-03-15T12:00:00';   // Replace with your end date

    // Construct the Google Calendar event link
    const googleCalendarLink = `https://www.google.com/calendar/event?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&details=${encodeURIComponent(eventDescription)}&location=${encodeURIComponent(eventLocation)}&dates=${encodeURIComponent(startDate)}/${encodeURIComponent(endDate)}`;

// Email content with the Google Calendar event link
    // todo need to add the qr code base 64 string while html its going to be image src
    const qrCode = generateQR({guestId,meetingId})
    let response = {
        body: {
            name: "Company_user_Name",
            intro: "We Warmly welcome you to our company",
            table: {
                data: [{
                    googleCalender:googleCalendarLink,
                    host,
                    date,
                    time,
                    location,
                    parking,
                    // we are getting the qr code we need to make the image src 
                    qrCode
                }],
                outro: "Heartly welcomes you"
            }
        }
    }
    return mailGenetor.generate(response)
}

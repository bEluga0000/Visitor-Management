import Mailgen from "mailgen";
import generateQR from "../generateQR";
interface meetingInvitationProps {
    // ? name
    host: string
    date: string
    time: string
    //? try to make google link   
    location: string
    parking: string
    guestId: string
    meetingId: string
    guestName: string
    hostEmail: string
    topic:string
}
export default function meetingInvitationFormat({
    host,
    date,
    time,
    location,
    parking,
    guestId,
    meetingId,
    guestName,
    hostEmail,
    topic
}: meetingInvitationProps) {
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
    const qrCode = generateQR({ guestId, meetingId })
    // let response = {
    //     body: {
    //         name: `Hi ${guestName}`,
    //         // here we going to add the meeting topic
    //         intro: "We Warmly welcome you to our company",
    //         action: {
    //             instructions: 'To get started with Mailgen, please click here:',
    //             button: {
    //                 color: '#22BC66', // Optional action button color
    //                 text: 'Add to calender',
    //                 link: googleCalendarLink
    //             }
    //         },
    //         // googleCalender: googleCalendarLink,
            
    //         host,
    //         date,
    //         time,
    //         location,
    //         parking,
    //         // we are getting the qr code we need to make the image src 
    //         qrCode: `<img src=${qrCode} alt = "QR Code" >`,
    //         outro: `for any queries contact ${hostEmail}`
    // }

// }
let response = {
    body: {
        name: 'Hi there!',
        intro: `This is a reminder that your webinar "${topic}" will begin in 1 hour:`,
        table: {
            data: [
                { 'Date & Time': date },
                { 'Webinar ID': "1234" },
            ],
            outro: 'You can cancel your registration at any time.',
        },
        action: {
            instructions: 'Add to your calendar:',
            button: {
                color: '#22BC66',
                text: 'Google Calendar',
                link: googleCalendarLink,
            },
        },
        outro: `Please submit any questions to: ${hostEmail}`,
    },
}
return mailGenetor.generate(response)
}

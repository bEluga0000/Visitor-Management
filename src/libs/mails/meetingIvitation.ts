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
    const monthArray = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    let dateToFormat = date.split("T")[0]
    const monthIndex = parseInt(dateToFormat.split('-')[1]) - 1;
    let month = monthArray[monthIndex]
    const dateFormated = `${month} ${dateToFormat.split('-')[2]} ${dateToFormat.split('-')[0]}`
    let timeToFormat = time.split(':')
    let timeHour = parseInt(timeToFormat[0]) > 12 ? parseInt(timeToFormat[0]) - 12 : parseInt(timeToFormat[0]);
    let ampm = parseInt(timeToFormat[0]) >= 12 ? 'pm' : 'am'
    let timeFormatted = `${timeHour}.${timeToFormat[1]}  ${ampm}`
    // Construct the Google Calendar event link
    const googleCalendarLink = `https://www.google.com/calendar/event?action=TEMPLATE&text=${encodeURIComponent(topic)}&location=${encodeURIComponent(location)}&dates=${encodeURIComponent(date)}`;

    // Email content with the Google Calendar event link
    // todo need to add the qr code base 64 string while html its going to be image src
    const qrCode = generateQR({ guestId, meetingId })
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Notification Interface</title>
<style>
  
   body {
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 20px;
  } 
    .reminder {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    padding: 20px;
    max-width: 300px;
    margin: auto;
  }
  .reminder-header {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .reminder-time {
    margin-bottom: 5px;
  }
  .reminder-footer {
    font-size: 14px;
    color: #555;
  }
  .in-hours {
    font-size: 14px;
    color: #888;
    text-align: right;
    margin-bottom: 10px;
  }
  .google-calendar-btn {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    border: 2px solid #ADD8E6;
    border-radius: 25px;
    background-color: #fff;
    cursor: pointer;
    font-family: Arial, sans-serif;
  }
  .google-calendar-icon {
    background-color: #4285F4;
    color: #fff;
    padding: 5px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .google-calendar-text {
    color: #000;
    font-size: 16px;
  }
</style>
</head>
<body>
   <div class="reminder">
    <div class="reminder-header">${topic}</div>
    <div class="reminder-time">${dateFormated}<br>starts at ${timeFormatted}</div>
    <div class="reminder-footer">
      <div>hosted By ${host}</div>
      <div>location ${location}</div>
      <div>parking area allocated ${parking ? parking : "building Parking area"}</div>
       <a href=${googleCalendarLink}  style="text-decoration: none; color: inherit;cursor:pointer;">
       <button class="google-calendar-btn">
    <div class="google-calendar-icon">31</div>
    <span class="google-calendar-text">Google Calendar</span>
  </button>
  </a>
    </div>
    <div>
    <p>Scan the QR code at the lobby and get your badge</p>
  <img src=${qrCode} alt="Meeting QR code">
  </div>
  <div>
  <p>For any more queries contact ${hostEmail}</p>
  </div>
  </div>
</body>
</html>`
}

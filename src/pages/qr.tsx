import { useCallback, useEffect } from "react";
import { useState } from "react";
import QRCode from 'qrcode'
import axios from "axios";
import generateQR from "@/libs/generateQR";
const Qr = () => {
    const [src, setSrc] = useState("")
    // const [generate, setGenrated] = useState(false)
    // const [userId, setUserId] = useState("")
    // const [meetingId, setMeetingId] = useState("")
    // const generateFunc = useCallback(()=>{
    //     QRCode.toDataURL(`http://localhost:3000/${meetingId}`).then(setSrc)
    //     setGenrated(true)
    // },[meetingId])
    // if (!generate) {
    //     return <>
    //         <input type="text" placeholder="meetingId" value={meetingId} onChange={(e) => { setMeetingId(e.target.value) }} />
    //         <input type="text" placeholder="userId" value={userId} onChange={(e) => { setUserId(e.target.value) }} />
    //         <button onClick={generateFunc}>Generate</button>
    //     </>
    // }
    const qrcode = generateQR({ meetingId: "1122", guestId: "12233445" })
    // setSrc(qrcode)
    return <>
    {/* <input type="text" placeholder="meetingId" value={meetingId} onChange={(e) => { setMeetingId(e.target.value) }} /> */}
            {/* <input type="text" placeholder="userId" value={userId} onChange={(e) => { setUserId(e.target.value) }} /> */}
            {/* <button onClick={generateFunc}>Generate</button> */}
        <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATbSURBVO3BQY4cSRIEQbVA/f/Lun30UwCJ9OolOSYSf1C15FC16FC16FC16FC16FC16FC16FC16FC16FC16FC16FC16FC16FC16FC16FC16MNLSfhNKk8k4UblNyXhRmVKwm9SeeNQtehQtehQtejDMpVNSXgiCZPKlIQpCZPKN6lMSXhCZVMSNh2qFh2qFh2qFn34siQ8ofJEEiaVG5VNSZhUbpKwKQlPqHzToWrRoWrRoWrRh/+YJEwqTyThJgmTyqTyLztULTpULTpULfrwj0nCjcqUhEllSsKNyk0SnlD5mx2qFh2qFh2qFn34MpXfpDIl4UblRuUmCZPKpPJNKn+SQ9WiQ9WiQ9WiD8uS8DdJwqQyJWFSeSIJk8qUhEnlJgl/skPVokPVokPVoviDv1gSJpVNSZhU3kjCpPIvOVQtOlQtOlQtij94IQmTypSETSo3SZhUpiTcqNwk4QmVN5KwSeWbDlWLDlWLDlWLPvxhVJ5Iwk0SJpUnkvCEyk0SJpUnVKYk3KhMSbhReeNQtehQtehQtejDSypPqDyRhEllUnkiCZPKlIRJZUrCpDIl4UblJglPqExJuFH5pkPVokPVokPVoviDF5IwqXxTEiaVKQmTyhNJuFHZlIQnVKYk3Kj8pkPVokPVokPVog9floRJ5SYJNyo3KlMSvikJNypTEiaVKQmTyo3KTRImlSkJk8obh6pFh6pFh6pFH15SeSMJNyo3SZhUblSmJNyoPKGyKQmTypSEG5UpCd90qFp0qFp0qFr04aUkTCpPqExJmJIwqUwqUxImlSdUbpIwqTyh8oTKJpVvOlQtOlQtOlQt+vCSyo3KGypTEm5UpiTcqHxTEm5UbpKwKQk3Km8cqhYdqhYdqhZ9eCkJk8qUhCdUpiTcqExJ+JOovKHyRBKmJNyobDpULTpULTpULYo/eCEJb6hMSZhUpiRMKjdJmFSmJNyoPJGEJ1RukvCGypSEG5U3DlWLDlWLDlWLPixTmZIwqdyoTEl4IgmTyo3KlIQpCTcqk8qUhEnlJgmTypSEG5UnVDYdqhYdqhYdqhZ9+D9LwqQyqTyhMiXhDZUpCU+oTEmYVCaVG5WbJEwqk8qUhEnljUPVokPVokPVog+/LAk3SbhRmZIwqTyhcpOEmyTcqEwqUxI2qUxJ+E2HqkWHqkWHqkUfXlK5UflNSZhU3lCZkjCp3CThCZUnkvCEypSETYeqRYeqRYeqRR9eSsJvUplUnkjCpPJNKlMSnkjCpHKThEnlRmXToWrRoWrRoWrRh2Uqm5Jwk4RJ5UbliSRMKk8kYVKZknCj8k1JmFTeOFQtOlQtOlQt+vBlSXhC5Y0kTCpTEm5UJpUpCZPKlIQ3kvCGypSESeWbDlWLDlWLDlWLPvxjVKYk3KhMSbhRuVGZkvCGyk0SpiQ8obLpULXoULXoULXowz8mCZPKGypTEiaVKQlPqNwk4QmVKQlTEiaVTYeqRYeqRYeqRR++TOWbVKYkPJGESeVG5UZlSsKUhCdUpiRMKlMSJpUpCd90qFp0qFp0qFr0YVkSflMSbpJwo/JGEp5Q2ZSESWVKwqTyTYeqRYeqRYeqRfEHVUsOVYsOVYsOVYsOVYsOVYsOVYsOVYsOVYsOVYsOVYsOVYsOVYsOVYsOVYsOVYv+B6C0WQcIoM3LAAAAAElFTkSuQmCC
' alt="" />
    </>
}
export default Qr;
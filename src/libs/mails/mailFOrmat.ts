import nodeMailer from "nodemailer"
export default function ()
{
    let config = {
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        secure: true, // use SSL
        port: 465, // secure SMTP
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false,
        },
    }
    let transporter = nodeMailer.createTransport(config)
    return transporter
    
}
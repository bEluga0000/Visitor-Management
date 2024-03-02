import nodeMailer from "nodemailer"
export default function ({email}:{email:string})
{
    let config = {
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    }
    let transporter = nodeMailer.createTransport(config)
    return transporter
    
}
import QrCode from "qrcode"

export default function generateQR({ meetingId, guestId }: { guestId: string, meetingId: string }): Promise<string | null> {
    return new Promise((resolve, reject) => {
        const data = {
            meetingId,
            guestId
        };
        const dataString = JSON.stringify(data);

        QrCode.toDataURL(dataString, (err, codeDataUrl) => {
            if (err) {
                console.error("Error while creating QRCODE:", err);
                resolve(null);
            }
            else {
                console.log(codeDataUrl);
                resolve(codeDataUrl);
            }
        });
    });
}

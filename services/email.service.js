const nodemailer = require('nodemailer');

let nodeMailerTransporter = null;

const initNodeMailer = () => {
    nodeMailerTransporter = nodemailer.createTransport({
        pool: true,
        host: process.env.APP_SMTP_SERVER,
        port: process.env.APP_SMTP_PORT,
        secure: true, // use TLS
        auth: {
            user: process.env.APP_SMTP_USER,
            pass: process.env.APP_SMTP_PASSWORD,
        }
    });
}

const verifyEmailSMTPService = async () => {
    initNodeMailer();
    // verify connection configuration
    const result = await nodeMailerTransporter.verify();
    return result;
}

const sendEmail = async () => {
    initNodeMailer();
    var message = {
        to: "alex27_perez@hotmail.com",
        subject: "Message title",
        text: "Plaintext version of the message",
        html: "<p>HTML version of the message</p>"
    };
    let info = await nodeMailerTransporter.sendMail(message);
    console.log("Message sent: %s", info.messageId);
}

module.exports = {verifyEmailSMTPService, sendEmail}

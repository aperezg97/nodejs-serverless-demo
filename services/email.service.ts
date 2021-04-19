import nodemailer from 'nodemailer';

export class EmailService {
    
    public nodeMailerTransporter: any = null;

    constructor() {
        this.initNodeMailer();
    }

    private initNodeMailer = () => {
        console.log("NodeMailer - Init");
        const nodemailConfig: any = {
            pool: true,
            host: process.env.APP_SMTP_SERVER,
            port: process.env.APP_SMTP_PORT,
            secure: true, // use TLS
            auth: {
                user: process.env.APP_SMTP_USER,
                pass: process.env.APP_SMTP_PASSWORD,
            },
            tls: {
              // do not fail on invalid certs
              rejectUnauthorized: false
            }
        };
        this.nodeMailerTransporter = nodemailer.createTransport(nodemailConfig);
        console.log("NodeMailer initialized correctly");
    }
    
    public async verifyEmailSMTPService() {
        // verify connection configuration
        const result = await this.nodeMailerTransporter.verify();
        return result;
    }
    
    public async sendEmail() {
        var message = {
            to: "alex27_perez@hotmail.com",
            subject: "Message title",
            text: "Plaintext version of the message",
            html: "<p>HTML version of the message</p>"
        };
        let info = await this.nodeMailerTransporter.sendMail(message);
        console.log("Message sent: %s", info.messageId);
        return {status: 'OK', message: `Message sent: ${info.messageId}`}
    }
}

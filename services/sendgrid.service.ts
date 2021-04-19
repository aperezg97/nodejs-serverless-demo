import sgMail from '@sendgrid/mail';
import { SendGridOptions } from 'interfaces/sendgrid';
import { TemplateService } from './template.service';

export class SendGridService {

    constructor() {
        this.initSendGrid();
    }
    
    public initSendGrid() {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
    }

    public async sendEmailTutorial() {
        const msg = {
            to: 'test@example.com',
            from: 'test@example.com', // Use the email address or domain you verified above
            subject: 'Sending with Twilio SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };
        //ES6
        sgMail
            .send(msg)
            .then(() => {}, error => {
            console.error(error);

            if (error.response) {
                console.error(error.response.body)
            }
            });
        //ES8
        (async () => {
            try {
            await sgMail.send(msg);
            } catch (error) {
            console.error(error);
        
            if (error.response) {
                console.error(error.response.body)
            }
            }
        })();
    }

    public async sendTestTemplateEmail(user: any) {
        const subject = `Welcome ${user.name}`;
        const text = `Welcome on mywebsite.fr! Your account is now linked with: ${user.email}.`;
        const userInfo = {
            user_firstname: user.name,
            user_lastname: user.lastname,
        }
        return await this.sendEmail({to: user.email, subject, text}, 'test', userInfo);
    }

    public async sendEmail(emailOptions: SendGridOptions, templateName: any = null, templateData: any = null) {
        if (templateName) {
            let templateService = new TemplateService();
            emailOptions.html = templateService.getHtmlTemplate(`templates/emails/${templateName}.html`, templateData);
        }

        const msg: any = {
            to: emailOptions.to,
            from: process.env.SENDGRID_FROM_ADDRESS, // Use the email address or domain you verified above
            subject: emailOptions.subject,
            text: emailOptions.text,
            html: emailOptions.html,
        };

        await sgMail.send(msg);
    }
}

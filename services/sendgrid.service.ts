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

    public async sendTestTemplateEmail(user: any) {
        const subject = `Welcome ${user.name}`;
        const text = `Welcome on mywebsite.fr! Your account is now linked with: ${user.email}.`;
        const userInfo = {
            user_firstname: user.name,
            user_lastname: user.lastname,
        }
        return await this.sendEmail({to: user.email, subject, text}, 
            `templates/emails/test.html`,
            userInfo);
    }

    public async sendEmail(emailOptions: SendGridOptions, templatePath: any = null, templateData: any = null) {
        if (templatePath) {
            let templateService = new TemplateService();
            emailOptions.html = templateService.getHtmlTemplate(templatePath, templateData);
        }

        const msg: any = {
            to: emailOptions.to,
            from: process.env.SENDGRID_FROM_ADDRESS, // Use the email address or domain you verified above
            subject: emailOptions.subject,
            text: emailOptions.text,
            html: emailOptions.html,
        };

        return await sgMail.send(msg);
    }
}

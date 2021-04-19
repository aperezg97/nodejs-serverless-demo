import { Callback, Context } from 'aws-lambda';
import { EmailService } from '../services/email.service';
import { SendGridService } from '../services/sendgrid.service';
import pug from "pug";
import { TemplateService } from '../services/template.service';

const sendEmailNotification =  async (event: any, context: Context, callback: Callback) => {
    let responseData;
    let emailService;
    try {
        emailService = new EmailService();
        const result = await emailService.sendEmail();
        responseData = { statusCode: 200, body: JSON.stringify(result) };
    } catch (ex) {
        console.log(ex);
        responseData = { statusCode: 500, body: JSON.stringify(ex, Object.getOwnPropertyNames(ex)) };
    }
    callback(null, responseData);
}

const verifyEmailSMTPService =  async (event: any, context: Context, callback: Callback) => {
    let responseData;
    let emailService;
    try {
        emailService = new EmailService();
        const result = await emailService.verifyEmailSMTPService();
        responseData = { statusCode: 200, body: JSON.stringify(result) };
    } catch (ex) {
        responseData = { statusCode: 500, body: JSON.stringify(ex, Object.getOwnPropertyNames(ex)) };
    }
    callback(null, responseData);
}

const envValues = (event: any, context: Context, callback: Callback) => {
    const responseData = { statusCode: 200, body: JSON.stringify({
        APP_SMTP_SERVER: process.env.APP_SMTP_SERVER,
        APP_SMTP_PORT: process.env.APP_SMTP_PORT,
        env: process.env}) 
    };
    callback(null, responseData);
}

const sendSendGridTestEmail = (event: any, context: Context, callback: Callback) => {
    let responseData;
    let sendGridService;
    try {
        const { user } = JSON.parse(event.body);
        sendGridService = new SendGridService();
        const result = sendGridService.sendTestTemplateEmail(user);
        responseData = { statusCode: 200, body: JSON.stringify(result) };
    } catch (ex) {
        responseData = { statusCode: 500, body: JSON.stringify(ex, Object.getOwnPropertyNames(ex)) };
    }
    callback(null, responseData);
}

const compilePugTemplate = (event: any, context: Context, callback: Callback) => {
    let templateService = new TemplateService();
    const compiledTemplate = templateService.getPubTemplate('templates/emails/test/pug/test.pug', {
        dummy_content: 'Dummy content from code',
        user_firstname: 'Test FirstName',
        user_lastname: 'Test Lastname',
    });
    const responseData = { 
        statusCode: 200,
        headers: {
            'Content-Type': 'text/html',
        },        
        body: compiledTemplate
    };
    callback(null, responseData);
}

const compileHtmlTemplate = (event: any, context: Context, callback: Callback) => {
    let templateService = new TemplateService();
    const compiledTemplate = templateService.getHtmlTemplate(`templates/emails/test/raw-html/test.html`, {
        '%user_firstname%': 'Test FirstName',
        '%user_lastname%': 'Test Lastname',
    });
    const responseData = { 
        statusCode: 200,
        headers: {
            'Content-Type': 'text/html',
        },        
        body: compiledTemplate
    };
    callback(null, responseData);
}

export { 
    sendEmailNotification,
    verifyEmailSMTPService,
    envValues,
    sendSendGridTestEmail,
    compilePugTemplate,
    compileHtmlTemplate,
 }
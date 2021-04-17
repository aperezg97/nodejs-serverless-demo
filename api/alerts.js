const emailService = require('../services/email.service');
const sendGridService = require('../services/sendgrid.service');

const sendEmailNotification = async (event, context, callback) => {
    let responseData;
    try {
        const result = await emailService.sendEmail();
        responseData = { statusCode: 200, body: JSON.stringify(result) };
    } catch (ex) {
        console.log(ex);
        responseData = { statusCode: 500, body: JSON.stringify(ex, Object.getOwnPropertyNames(ex)) };
    }
    callback(null, responseData);
}

const verifyEmailSMTPService = async (event, context, callback) => { 
    let responseData;
    try {
        const result = await emailService.verifyEmailSMTPService();
        responseData = { statusCode: 200, body: JSON.stringify(result) };
    } catch (ex) {
        responseData = { statusCode: 500, body: JSON.stringify(ex, Object.getOwnPropertyNames(ex)) };
    }
    callback(null, responseData);
}

const envValues = (event, context, callback) => {
    const responseData = { statusCode: 200, body: JSON.stringify({
        APP_SMTP_SERVER: process.env.APP_SMTP_SERVER,
        APP_SMTP_PORT: process.env.APP_SMTP_PORT,
        env: process.env}) 
    };
    callback(null, responseData);
}

const sendSendGridTestEmail = (event, context, callback) => {
    const { user } = JSON.parse(event.body);
    let responseData;
    try {
        const result = sendGridService.sendTestTemplateEmail(user);
        responseData = { statusCode: 200, body: JSON.stringify(result) };
    } catch (ex) {
        responseData = { statusCode: 500, body: JSON.stringify(ex, Object.getOwnPropertyNames(ex)) };
    }
    callback(null, responseData);
}

module.exports = {
    verifyEmailSMTPService, 
    sendEmailNotification, 
    envValues,
    sendSendGridTestEmail
}

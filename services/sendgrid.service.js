const { readFileSync } = require('fs');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmailTutorial = () => {
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

async function sendTestTemplateEmail(user) {
    const subject = `Welcome ${user.name}`;
    const text = `Welcome on mywebsite.fr! Your account is now linked with: ${user.email}.`;
    const userInfo = {
        user_firstname: user.name,
        user_lastname: user.lastname,
    }
    return await sendEmail({to: user.email}, {subject, text}, 'test', userInfo);
}

/*
    emailOptions: to, from, replyTo, cc, bcc
    emailData: subject, text
*/
async function sendEmail(emailOptions, emailData, templateName = null, templateData = null) {
    if (templateName) {
        let htmlTemplateContent = templateName ? readFileSync(`templates/emails/${templateName}.html`, 'utf8') : null;
        if (templateData && htmlTemplateContent) {
            console.log({type: typeof htmlTemplateContent});
            Object.entries(templateData).forEach((entry) => {
                const replacer = new RegExp(`%${entry[0]}%`, 'g')
                htmlTemplateContent = htmlTemplateContent.replace(replacer, entry[1]);
            });
        }
        emailData.html = htmlTemplateContent;
    }

    const msg = {
        to: emailOptions.to,
        from: process.env.SENDGRID_FROM_ADDRESS, // Use the email address or domain you verified above
        subject: emailData.subject,
        text: emailData.text,
        html: emailData.html,
    };

    await sgMail.send(msg);
}

module.exports = { sendTestTemplateEmail }
import { Callback, Context } from 'aws-lambda';
import { SendGridOptions } from 'interfaces/sendgrid';
import { SendGridService } from '../services/sendgrid.service';

const sendContactEmail = (event: any, context: Context, callback: Callback) => {
    let responseData;
    let sendGridService;
    try {
        const { organization, user, animals } = JSON.parse(event.body);

        if (!organization || !user || !animals) {
            responseData = { statusCode: 500, body: JSON.stringify({
                status: false,
                message: "Required fields missing, 'organization', 'user' and 'animals' are required!",
            })};
            callback(null, responseData);
        }

        // Reading values from request
        const organizationData = {
            name: organization.name,
            email: organization.email,
        };
        const userInfo = {
            name: user.name,
            second_name: user.second_name,
            last_name: user.last_name,
            email: user.email,
            marital_status: user.marital_status,
            city_of_residence: user.city_of_residence,
            address: user.address,
            nationality: user.nationality,
            phone_number: user.phone_number,
        };
        const animalsData: any[] = [];
        animals.forEach((animal: any) => {
            animalsData.push({
                name: animal.name
            });
        });

        if (!organizationData.name || !organizationData.email) {
            throw Error('Organization name and email are required!');
        }

        const subject = `Hi ${organization.name}`;
        const text = `You have received a new Contact request!`;

        const emailOptions: SendGridOptions = {
            to: organizationData.email,
            subject, 
            text
        };

        sendGridService = new SendGridService();
        const result = sendGridService.sendEmail(emailOptions, `./templates/emails/contact/contact-email.html`,{
            organizationData,
            userInfo,
            animals: animalsData.map((animal) => animal.name).join(','),
        });
        responseData = { statusCode: 200, body: JSON.stringify({
            status: true,
            result
        }) };
    } catch (ex) {
        responseData = { statusCode: 500, body: JSON.stringify(ex, Object.getOwnPropertyNames(ex)) };
    }
    callback(null, responseData);
}

export {
    sendContactEmail,
}

import brevo from '@getbrevo/brevo';
import generateErrorUtils from './generateErrorUtils.js';

import { SMTP_API_KEY, CONTACT_EMAIL } from '../../env.js';

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, SMTP_API_KEY);

const sendMailUtils = async (email, subject, body) => {
    try {
        const sendSmtpMail = new brevo.SendSmtpEmail();

        sendSmtpMail.subject = subject;
        sendSmtpMail.to = [{ email: email }];

        sendSmtpMail.htmlContent = body;

        sendSmtpMail.sender = {
            name: 'Equipo de Hackathones',
            email: CONTACT_EMAIL,
        };

        await apiInstance.sendTransacEmail(sendSmtpMail);
    } catch (error) {
        console.log(error);
        throw generateErrorUtils('Error al enviar el email', 500);
    }
};

export default sendMailUtils;

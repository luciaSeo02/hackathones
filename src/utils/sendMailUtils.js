import brevo from '@getbrevo/brevo';
import 'dotenv/config';

const {SMTP_API_KEY, SMTP_USER} = process.env;

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    SMTP_API_KEY
);

const sendMailUtils = async (email, subject, html) => {
    try{

        const sendSmtpMail = new brevo.SendSmtpEmail();

        sendSmtpMail.subject = subject;
        sendSmtpMail.to = [
            { email: email,}
        ];

        sendSmtpMail.htmlContent = html;
        
        sendSmtpMail.sender = {
            name: 'Equipo de Hackathones',
            email: SMTP_USER 
        }

        await apiInstance.sendTransacEmail(sendSmtpMail);

    } catch (error) {
        console.log(error);
        throw generateErrorUtils('Error al enviar el email', 500);
    }
}; 

export default sendMailUtils;
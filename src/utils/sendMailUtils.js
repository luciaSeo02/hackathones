import brevo from '@getbrevo/brevo';
import 'dotenv/config';

const {SMTP_API_KEY, SMTP_USER} = process.env;

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    SMTP_API_KEY
);

const sendMailUtils = async (email, subject, body) => {
    try{

        const sendSmtpMail = new brevo.SendSmtpEmail();

        sendSmtpMail.subject = subject;
        sendSmtpMail.to = [
            { email: email,}
        ];

        sendSmtpMail.htmlContent = body;
        
        sendSmtpMail.sender = {
            name: 'Equipo de Hackathones',
            email: "ismpascu43@gmail.com" 
        }

        await apiInstance.sendTransacEmail(sendSmtpMail);

    } catch (error) {
        console.log(error);
        throw generateErrorUtils('Error al enviar el email', 500);
    }
}; 

export default sendMailUtils;
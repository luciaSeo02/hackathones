import getPool from '../../database/getPool.js';
import sendMailUtils from '../../utils/sendMailUtils.js';
import { CONTACT_EMAIL } from '../../../env.js';

const insertContactMessageService = async ({ name, email, message }) => {
    const pool = await getPool();

    await pool.query(
        `
            INSERT INTO contact_messages (name, email, message) 
            VALUES (?,?,?)
        `,
        [name, email, message]
    );

    await sendMailUtils(
        CONTACT_EMAIL,
        'Nuevo mensaje desde la página de contacto',
        `<p>Mensaje de ${name} (${email}):</p><p>${message}</p>`
    );

    await sendMailUtils(
        email,
        'Hemos recibido tu mensaje',
        `<p>Gracias por contactarnos ${name}. Te responderemos pronto`
    );
};

export default insertContactMessageService;

import getPool from '../../database/getPool.js';
import sendMailUtils from '../../utils/sendMailUtils.js';

const RecoverPassService = async (email, recoverPassCode) => {
    const pool = await getPool();

    await pool.query(
        `
            UPDATE users
            SET recoverPassCode=?
            WHERE email=?
        `,
        [recoverPassCode, email]
    );

    const emailSubject = 'Recuperación de contraseña de hackathones';

    const emailBody = `
        <html>
            <body>
                <h2>Recuperación de contraseña para ${email}</h2>
                <p>
                    Se ha solicitado la recuperación de la contraseña enhackathones.<br>
                    Utiliza el siguiente código de recuperación para crear una nueva.<br>
                    Código de recuperación: ${recoverPassCode}<br>
                </p>
                <p>
                    Si no fue usted el que solicito la recuperación, ignore este email.
                </p>
            </body>
        </html>
    `;

    await sendMailUtils(email, emailSubject, emailBody);
};

export default RecoverPassService;

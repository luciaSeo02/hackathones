import getPool from '../../database/getPool.js';
import generateErrorsUtils from '../../utils/generateErrorUtils.js';
import bcrypt from 'bcrypt';
import sendMailUtils from '../../utils/sendMailUtils.js';

const insertUserService = async (
    email,
    password,
    registrationCode,
    username
) => {
    const pool = await getPool();

    const [user] = await pool.query(
        `
            SELECT id FROM users WHERE email = ?
        `,
        [email]
    );

    if (user.length)
        throw generateErrorsUtils('El email ya se encuentra registrado.', 409);

    const emailSubject = 'Activa tu cuenta de Hackathones';

    const emailBody = `
        <html>
            <body>
                <h2>Bienvenid@ ${username}</h2>
                <p>
                    Gracias por registrarte a Hackathones. Para activar tu cuenta
                    debe hacer click en el siguiente enlace:
                </p>
                <p>
                    <a href="http://localhost:5173/users/validate/${registrationCode}">
                        Activar Cuenta
                    </a>
                    Hecho por el equipo de Hackathones.
                </p>
            </body>
        </html>
    `;

    await sendMailUtils(email, emailSubject, emailBody);

    const passwordHassed = await bcrypt.hash(password, 10);

    await pool.query(
        `
            INSERT INTO users (email, password, registrationCode, username)
            VALUES(?,?,?,?)
            
        `,
        [email, passwordHassed, registrationCode, username]
    );
};

export default insertUserService;

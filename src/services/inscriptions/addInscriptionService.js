import getPool from '../../database/getPool.js';
import generateErrorUtils from '../../utils/generateErrorUtils.js';
import { v4 as uuidv4 } from 'uuid';
import sendMailUtils from '../../utils/sendMailUtils.js';
import { HOST, PORT } from '../../../env.js';

const insertNewInscription = async ({ userId, hackathonId }) => {
    if (!userId || !hackathonId) {
        throw generateErrorUtils('Datos faltantes', 400);
    }

    const pool = await getPool();

    const [userRows] = await pool.query(
        'SELECT email FROM users WHERE id = ?',
        [userId]
    );

    if (userRows.length === 0) {
        throw generateErrorUtils('Usuario no encontrado', 404);
    }

    const email = userRows[0].email;

    const [existing] = await pool.query(
        `SELECT id FROM hackathon_user_registrations WHERE userId= ? AND hackathonId= ?`,
        [userId, hackathonId]
    );

    if (existing.length > 0) {
        throw generateErrorUtils('Ya te has inscrito en este evento', 409);
    }

    const [[{ startDate }]] = await pool.query(
        `SELECT startDate FROM hackathons WHERE id = ?`,
        [hackathonId]
    );

    const currentDate = new Date();
    const cancelDeadline = new Date(startDate);
    cancelDeadline.setDate(cancelDeadline.getDate() - 3);

    if (currentDate > cancelDeadline) {
        throw generateErrorUtils(
            'Ya no puedes inscribirte, el plazo ha vencido',
            403
        );
    }

    const registrationCode = uuidv4();

    await pool.query(
        `INSERT INTO hackathon_user_registrations (userId, hackathonId, registrationCode) VALUES (?, ?, ?)`,
        [userId, hackathonId, registrationCode]
    );

    // const eventUrl =  `${HOST}/hackathons/${hackathonId}`;
    const eventUrl = `${HOST}:${PORT}/hackathons/${hackathonId}`;

    await sendMailUtils(
        email,
        'Inscripción confirmada',
        `
            <p>Gracias por inscribirte en nuestro hackathon!</p>
            <p>Tu código de inscripción es: <strong>${registrationCode}</strong></p>
            <p>Consulta todos los detalles del evento, ubicación, fechas y más en el siguiente enlace: </p>
            <p><a href='${eventUrl}'>Ver detalles del evento</a></p>
            <p>No olvides guardar tu código contigo para confirmar tu participación</p>
        `
    );
};

export default insertNewInscription;

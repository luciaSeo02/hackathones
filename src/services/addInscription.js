// codigo para contactar con el servidor para realizar una inscripcion

import getPool from '../database/getPool.js';

const insertNewInscription = async ({ userId, hackathonId }) => {
    if (!userId || !hackathonId) {
        const error = new Error('datos faltantes :(');
        error.status = 400;
        throw error;
    }

    const pool = await getPool();

    const [existing] = await pool.query(
        `SELECT id FROM hackathon_user_registrations WHERE userId= ? AND hackathonId= ?`,
        [userId, hackathonId]
    );

    if (existing.length > 0) {
        const error = new Error('Ya te has inscrito en este evento');
        error.status = 409;
        throw error;
    }

    await pool.query(
        `INSERT INTO hackathon_user_registrations (userId,hackathonId) VALUES (?, ?)`,
        [userId, hackathonId]
    );
};

export default insertNewInscription;

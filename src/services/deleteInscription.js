import getPool from '../database/getPool.js';

const deleteInscription = async ({ userId, hackathonId }) => {
    if (!userId || !hackathonId) {
        const error = new Error('Faltan datos');
        error.status = 400;
        throw error;
    }

    const pool = await getPool();

    const [existing] = await pool.query(
        'SELECT id FROM hackathon_user_registrations WHERE userId = ? AND hackathonId = ?',
        [userId, hackathonId]
    );

    if (existing.length === 0) {
        const error = new Error('No existe ninguna inscripción');
        error.status = 404;
        throw error;
    }

    await pool.query(
        'DELETE FROM hackathon_user_registrations WHERE userId = ? AND hackathonId = ?',
        [userId, hackathonId]
    );
};

export default deleteInscription;

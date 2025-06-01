import getPool from '../../database/getPool.js';
import generateErrorUtils from '../../utils/generateErrorUtils.js';

const deleteInscription = async ({ userId, hackathonId }) => {
    if (!userId || !hackathonId) {
        throw generateErrorUtils('Faltan datos', 400);
    }

    const pool = await getPool();

    const [existing] = await pool.query(
        'SELECT id FROM hackathon_user_registrations WHERE userId = ? AND hackathonId = ?',
        [userId, hackathonId]
    );

    if (existing.length === 0) {
        throw generateErrorUtils('No existe ninguna inscripción', 404);
    }

    const [[{ startDate }]] = await pool.query(
        `SELECT startDate FROM hackathons WHERE id = ?`,
        [hackathonId]
    );

    const currentDate = new Date();
    const cancelDeadline = new Date(startDate);
    cancelDeadline.setDate(cancelDeadline.getDate() - 2);

    if (currentDate > cancelDeadline) {
        throw generateErrorUtils(
            'Ya no puedes cancelar la inscripción, el plazo ha vencido',
            403
        );
    }

    await pool.query(
        'DELETE FROM hackathon_user_registrations WHERE userId = ? AND hackathonId = ?',
        [userId, hackathonId]
    );
};

export default deleteInscription;

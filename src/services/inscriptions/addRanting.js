import getPool from '../../database/getPool.js';

const addRating = async ({ userId, hackathonId, rating }) => {
    if (!userId || !hackathonId || !rating || rating < 1 || rating > 5) {
        throw new Error('Datos inválidos para calificar el hackathon');
    }

    const pool = await getPool();

    const [hackathons] = await pool.query(
        'SELECT endDate FROM hackathons WHERE id = ?',
        [hackathonId]
    );
    if (hackathons.length === 0) {
        throw new Error('El hackathon no existe');
    }
    const hackathonDate = new Date(hackathons[0].endDate);
    const now = new Date();
    if (now < hackathonDate) {
        throw new Error(
            'Solo puedes valorar un hackathon después de su realización'
        );
    }

    const [inscriptions] = await pool.query(
        'SELECT id FROM hackathon_user_registrations WHERE userId = ? AND hackathonId = ?',
        [userId, hackathonId]
    );
    if (inscriptions.length === 0) {
        throw new Error(
            'Solo los usuarios inscritos pueden valorar este hackathon'
        );
    }

    const [existing] = await pool.query(
        'SELECT id FROM hackathon_user_rating WHERE userId = ? AND hackathonId = ?',
        [userId, hackathonId]
    );
    if (existing.length > 0) {
        throw new Error('Ya has valorado este hackathon');
    }

    await pool.query(
        'INSERT INTO hackathon_user_rating (userId, hackathonId, rating) VALUES (?, ?, ?)',
        [userId, hackathonId, rating]
    );
};

export default addRating;

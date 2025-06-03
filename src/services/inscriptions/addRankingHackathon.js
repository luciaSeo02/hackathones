import getPool from '../../database/getPool.js';

const addRanking = async ({ userId, hackathonId, position }) => {
    if (!position || !userId || !hackathonId) {
        throw new Error('campos vacíos :(');
    }

    const pool = await getPool();

    await pool.query(
        'INSERT INTO hackathon_user_rankings (userId, hackathonId, position) VALUES (?, ?, ?)',
        [userId, hackathonId, position]
    );
};

export default addRanking;

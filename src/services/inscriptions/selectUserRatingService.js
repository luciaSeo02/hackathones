import getPool from '../../database/getPool.js';

const selectUserRatingService = async (hackathonId, userId) => {
    const pool = await getPool();

    const [rows] = await pool.query(
        `SELECT rating FROM hackathon_user_rating
     WHERE hackathonId = ? AND userId = ?`,
        [hackathonId, userId]
    );

    console.log(rows);

    return rows[0]?.rating ?? null;
};

export default selectUserRatingService;

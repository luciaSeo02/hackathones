import getPool from '../../database/getPool.js';

const getClassification = async (req, res, next) => {
    try {
        const { hackathonId } = req.params;
        const pool = await getPool();
        const [rows] = await pool.query(
            `SELECT r.position, u.username, u.email, u.avatar
       FROM hackathon_user_rankings r
       JOIN users u ON r.userId = u.id
       WHERE r.hackathonId = ?
       ORDER BY r.position ASC`,
            [hackathonId]
        );
        res.status(200).json({ classification: rows });
    } catch (error) {
        next(error);
    }
};

export default getClassification;

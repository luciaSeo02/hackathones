import getPool from '../../database/getPool.js';

async function getInscriptionUser(userId) {
    const pool = await getPool();
    const [rows] = await pool.query(
        `
            SELECT h.id, h.name, h.description, h.startDate, h.endDate, h.location, h.onlineUrl, t.name AS topic,
            CASE WHEN h.endDate < NOW() THEN 'past' ELSE 'upcoming' END AS status,
            ranking.position
            FROM hackathon_user_registrations r
            JOIN hackathons h ON r.hackathonId = h.id
            JOIN topics t ON h.topicId = t.id
            LEFT JOIN hackathon_user_rankings ranking
            ON ranking.userId = r.userId AND ranking.hackathonId = r.hackathonId
            WHERE r.userId = ?
            ORDER BY h.startDate DESC
        `,
        [userId]
    );
    return rows;
}
export default getInscriptionUser;

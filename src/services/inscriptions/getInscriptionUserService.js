import getPool from '../../database/getPool.js';

async function getInscriptionUser(userId, limit = 24, page = 1) {
    const pool = await getPool();

    const [totalRows] = await pool.query(
        `
            SELECT COUNT(*) as total
            FROM hackathon_user_registrations r
            JOIN hackathons h ON r.hackathonId = h.id
            WHERE r.userId = ?
        `,
        [userId]
    );
    const total = totalRows[0]?.total || 0;

    const offset = (Number(page) - 1) * Number(limit);

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
            LIMIT ? OFFSET ?
        `,
        [userId, Number(limit), offset]
    );

    return { inscriptions: rows, total };
}
export default getInscriptionUser;

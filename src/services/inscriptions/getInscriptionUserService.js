import getPool from '../../database/getPool.js';

async function getInscriptionUser(userId) {
    const pool = await getPool();
    const [rows] = await pool.query(
        `
            SELECT h.id, h.name, h.startDate, h.endDate, h.location, h.onlineUrl,
                CASE WHEN h.endDate < NOW() THEN 'past' ELSE 'upcoming'
            END AS status
            FROM hackathon_user_registrations r 
            JOIN hackathons h ON r.hackathonId = h.id 
            WHERE r.userId = ?
            ORDER BY h.startDate DESC
        `,
        [userId]
    );
    return rows;
}
export default getInscriptionUser;

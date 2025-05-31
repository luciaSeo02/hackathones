import getPool from '../../database/getPool.js';

async function getInscriptionUser(userId) {
    const pool = await getPool();
    const [rows] = await pool.query(
        `
            SELECT h.id, h.name, h.date FROM hackathon_user_registrations r 
            JOIN hackathons h ON r.hackathonId = h.id WHERE r.userId = ?
        `,
        [userId]
    );
    return rows;
}
export default getInscriptionUser;

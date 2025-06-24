import getPool from '../../database/getPool.js';

const getParticipantsByHackathonId = async (hackathonId) => {
  const pool = await getPool();
  const [rows] = await pool.query(
    `SELECT u.id, u.email
     FROM users u
     JOIN hackathon_user_registrations h ON u.id = h.userId
     WHERE h.hackathonId = ?`,
    [hackathonId]
  );
  return rows;
};

export default getParticipantsByHackathonId;
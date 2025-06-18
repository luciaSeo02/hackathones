import getPool from "../../database/getPool.js";

const listInscriptionUser = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const pool = await getPool();
    const [inscriptions] = await pool.query(
      `SELECT 
        i.id,
        i.hackathonId,
        h.name,
        h.description,
        h.modality,
        h.onlineUrl,
        h.location,
        h.startDate,
        h.endDate
      FROM hackathon_user_registrations i
      JOIN hackathons h ON i.hackathonId = h.id
      WHERE i.userId = ?`,
      [userId]
    );
    res.json({ inscriptions });
  } catch (err) {
    next(err);
  }
};

export default listInscriptionUser;
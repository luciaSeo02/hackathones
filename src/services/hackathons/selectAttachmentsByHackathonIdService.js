import getPool from '../../database/getPool.js';

const selectAttachmentsByHackathonIdService = async (hackathonId) => {
    const pool = await getPool();

    const [rows] = await pool.query(
        `SELECT fileUrl, fileType FROM hackathon_attachments WHERE hackathonId = ?`,
        [hackathonId]
    );

    return rows;
};

export default selectAttachmentsByHackathonIdService;

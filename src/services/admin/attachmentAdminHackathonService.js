import getPool from '../../database/getPool.js';

const attachmentAdminHackathonService = async (
    hackathonId,
    { fileUrl, fileType }
) => {
    const pool = await getPool();

    await pool.query(
        'INSERT INTO hackathon_attachments (fileUrl, fileType, hackathonId) VALUES (?, ?, ?)',

        [fileUrl, fileType, hackathonId]
    );
};

export default attachmentAdminHackathonService;

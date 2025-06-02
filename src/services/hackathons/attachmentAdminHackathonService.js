import getPool from '../../database/getPool.js';

const attachmentAdminHackathonService = async (hackathonId,{ nombre, url, descripcion }) => {
    const pool = await getPool();

    await pool.query(

        'INSERT INTO hackathon_attachments (hackathon_id, nombre, url, descripcion) VALUES (?, ?, ?, ?)',

        [hackathonId, nombre, url, descripcion]

    );
    
};

export default attachmentAdminHackathonService;

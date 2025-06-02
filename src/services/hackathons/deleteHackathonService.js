import getPool from '../../database/getPool.js';

const deleteHackathonService = async (id) => {

    const pool = await getPool();

    await pool.query('DELETE FROM hackathons WHERE id = ?', [id]);
    
};

export default deleteHackathonService;
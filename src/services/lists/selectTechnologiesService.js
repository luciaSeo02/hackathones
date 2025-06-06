import getPool from '../../database/getPool.js';

const selectTechnologiesService = async () => {
    const pool = await getPool();

    const [technologies] = await pool.query(
        `
            SELECT *
            FROM technologies
        `
    );

    return technologies;
};

export default selectTechnologiesService;

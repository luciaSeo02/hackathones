import getPool from '../../database/getPool.js';

const selectTopicsService = async () => {
    const pool = await getPool();

    const [topics] = await pool.query(
        `
            SELECT *
            FROM topics
        `
    );

    return topics;
}

export default selectTopicsService;
// este bloque de código es provisional a la espera de la BBDD

import getPool from '../../database/getPool.js';

const selectHackathonsService = async () => {
    
    const pool = await getPool();

    const [] = await pool.query(
        `
        `
    );

    return;

};

export default selectHackathonsService;
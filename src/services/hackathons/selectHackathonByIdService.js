// este bloque de código es provisional a la espera de la BBDD

import getPool from '../../database/getPool.js';

const selectHackathonByIdService = async (id) => {
    const pool = await getPool();

    const [hackathons] = await pool.query(
        `
            SELECT
            h.id, h.name, h.description, h.modality, h.location, h.onlineUrl,
            h.startDate, h.endDate, t.name AS topic
            FROM hackathons h
            JOIN topics t ON h.topicId = t.id
            WHERE h.id = ?
        `,
        [id]
    );

    return hackathons[0];
};

export default selectHackathonByIdService;

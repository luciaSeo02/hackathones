import getPool from '../../database/getPool.js';

const selectHackathonsWithFiltersService = async ({
    topic,
    modality,
    startDate,
    endDate,
    technologies,
    orderBy,
}) => {
    const pool = await getPool();

    let query = `
        SELECT DISTINCT h.id, h.name, h.modality, h.location, h.onlineUrl, h.startDate, h.endDate, t.name AS topic, GROUP_CONCAT(DISTINCT tech.name) AS technologies
        FROM hackathons h
        JOIN topics t ON h.topicId = t.id
        LEFT JOIN hackathon_technologies ht ON ht.hackathonId = h.id
        LEFT JOIN technologies tech ON tech.id = ht.technologyId
        WHERE 1 = 1
    `;

    const values = [];

    if (topic) {
        query += ` AND t.name = ?`;
        values.push(topic);
    }

    if (modality) {
        query += ` AND h.modality = ?`;
        values.push(modality);
    }

    if (startDate) {
        query += ` AND h.startDate >= ?`;
        values.push(startDate);
    }

    if (endDate) {
        query += ` AND h.endDate <= ?`;
        values.push(endDate);
    }

    if (technologies) {
        const techArray = technologies.split(',');
        const placeholders = techArray.map(() => '?').join(', ');
        query += ` AND tech.name IN (${placeholders})`;
        values.push(...techArray);
    }

    query += `
        GROUP BY h.id, h.name, h.modality, h.location, h.onlineUrl, h.startDate, h.endDate, t.name
    `;

    if (orderBy === 'startDate' || orderBy === 'topic') {
        query += ` ORDER BY ${orderBy} ASC`;
    } else {
        query += ` ORDER BY h.startDate DESC`;
    }

    const [rows] = await pool.query(query, values);

    return rows;
};

export default selectHackathonsWithFiltersService;

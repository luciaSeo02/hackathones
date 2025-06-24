import getPool from '../../database/getPool.js';

const selectHackathonsAutoService = async ({
    query,
    topic,
    modality,
    startDate,
    endDate,
    technologies,
}) => {
    const pool = await getPool();

    // Sugerencias de hackathones
    let sql = `
        SELECT DISTINCT h.name AS suggestion
        FROM hackathons h
        JOIN topics t ON h.topicId = t.id
        LEFT JOIN hackathon_technologies ht ON ht.hackathonId = h.id
        LEFT JOIN technologies tech ON tech.id = ht.technologyId
        WHERE (h.name LIKE ? OR t.name LIKE ?)
    `;
    const values = [`%${query}%`, `%${query}%`];

    if (topic) {
        sql += ' AND t.name = ?';
        values.push(topic);
    }
    if (modality) {
        sql += ' AND h.modality = ?';
        values.push(modality);
    }
    if (startDate) {
        sql += ' AND h.startDate >= ?';
        values.push(startDate);
    }
    if (endDate) {
        sql += ' AND h.endDate <= ?';
        values.push(endDate);
    }
    if (technologies) {
        const techArray = technologies.split(',');
        const placeholders = techArray.map(() => '?').join(', ');
        sql += ` AND tech.name IN (${placeholders})`;
        values.push(...techArray);
    }

    sql += ' LIMIT 10';

    // Sugerencias de temáticas (topics)
    let sqlTopics = `
        SELECT DISTINCT t.name AS suggestion
        FROM topics t
        WHERE t.name LIKE ?
        LIMIT 10
    `;
    const topicValues = [`%${query}%`];

    // Sugerencias de modalidades
    let sqlModalities = `
        SELECT DISTINCT h.modality AS suggestion
        FROM hackathons h
        WHERE h.modality LIKE ?
        LIMIT 10
    `;
    const modalityValues = [`%${query}%`];

    // Sugerencias de tecnologías
    let sqlTechnologies = `
        SELECT DISTINCT tech.name AS suggestion
        FROM technologies tech
        WHERE tech.name LIKE ?
        LIMIT 10
    `;
    const technologyValues = [`%${query}%`];

    // Ejecuta todas las consultas
    const [hackathonRows] = await pool.query(sql, values);
    const [topicRows] = await pool.query(sqlTopics, topicValues);
    const [modalityRows] = await pool.query(sqlModalities, modalityValues);
    const [technologyRows] = await pool.query(sqlTechnologies, technologyValues);

    // Combina y elimina duplicados
    const suggestionsSet = new Set([
        ...hackathonRows.map(r => r.suggestion),
        ...topicRows.map(r => r.suggestion),
        ...modalityRows.map(r => r.suggestion),
        ...technologyRows.map(r => r.suggestion),
    ]);
    return Array.from(suggestionsSet).filter(Boolean);
};

export default selectHackathonsAutoService;
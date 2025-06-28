import getPool from '../../database/getPool.js';

const selectHackathonsWithFiltersService = async ({
    search,
    topic,
    modality,
    startDate,
    endDate,
    technologies,
    orderBy,
    orderDirection = 'desc',
    isFavourite,
    activeOnly,
    limit = 24,
    page = 1,
}) => {
    const pool = await getPool();

    let baseQuery = `
        FROM hackathons h
        JOIN topics t ON h.topicId = t.id
        LEFT JOIN hackathon_technologies ht ON ht.hackathonId = h.id
        LEFT JOIN technologies tech ON tech.id = ht.technologyId
        WHERE 1 = 1
    `;

    const values = [];

    if (isFavourite === 'true') {
        baseQuery += ` AND h.isFavourite = true`;
    }

    if (activeOnly === 'true') {
        baseQuery += ` AND h.endDate >= CURRENT_TIMESTAMP`;
    }

    if (search) {
        baseQuery += ` AND (h.name LIKE ? OR t.name LIKE ?)`;
        values.push(`%${search}%`, `%${search}%`);
    }

    if (topic) {
        baseQuery += ` AND t.name = ?`;
        values.push(topic);
    }

    if (modality) {
        baseQuery += ` AND h.modality = ?`;
        values.push(modality);
    }

    if (startDate) {
        baseQuery += ` AND h.startDate >= ?`;
        values.push(startDate);
    }

    if (endDate) {
        baseQuery += ` AND h.endDate <= ?`;
        values.push(endDate);
    }

    if (technologies) {
        const techArray = technologies.split(',');
        const placeholders = techArray.map(() => '?').join(', ');
        baseQuery += ` AND tech.name IN (${placeholders})`;
        values.push(...techArray);
    }

    const [totalRows] = await pool.query(
        `
        SELECT COUNT(DISTINCT h.id) as total
        ${baseQuery}
        `,
        values
    );
    const total = totalRows[0]?.total || 0;

    let query = `
        SELECT DISTINCT h.id, h.name, h.description, h.isFavourite, h.modality, h.location, h.onlineUrl, h.startDate, h.endDate, h.createdAt, t.name AS topic, GROUP_CONCAT(DISTINCT tech.name) AS technologies
        ${baseQuery}
        GROUP BY h.id, h.name, h.description, h.isFavourite, h.modality, h.location, h.onlineUrl, h.startDate, h.endDate, h.createdAt, t.name
    `;

    const validOrderByFields = ['startDate', 'createdAt'];
    const validOrderDirections = ['asc', 'desc'];

    if (
        validOrderByFields.includes(orderBy) &&
        validOrderDirections.includes(orderDirection.toLowerCase())
    ) {
        query += ` ORDER BY ${orderBy} ${orderDirection.toUpperCase()}`;
    } else {
        query += ` ORDER BY h.startDate DESC`;
    }

    const offset = (Number(page) - 1) * Number(limit);
    query += ` LIMIT ? OFFSET ?`;
    values.push(Number(limit), offset);

    const [rows] = await pool.query(query, values);

    return { hackathons: rows, total };
};

export default selectHackathonsWithFiltersService;

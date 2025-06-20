import getPool from '../../database/getPool.js';
import generateErrorUtils from '../../utils/generateErrorUtils.js';

const insertHackathonService = async ({
    name,
    description,
    modality,
    location,
    onlineUrl,
    startDate,
    endDate,
    topicName,
    technologyNames,
    creatorId,
}) => {
    const pool = await getPool();

    const [[topic]] = await pool.query(`SELECT id FROM topics WHERE name = ?`, [
        topicName,
    ]);

    if (!topic) throw generateErrorUtils('Tema no encontrado', 400);
    const topicId = topic.id;

    const [result] = await pool.query(
        `
            INSERT INTO hackathons
            (name, description, modality, location, onlineUrl, startDate, endDate, topicId, creatorId)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            name,
            description,
            modality,
            location,
            onlineUrl,
            startDate,
            endDate,
            topicId,
            creatorId
        ]
    );

    const hackathonId = result.insertId;

    if (Array.isArray(technologyNames)) {
        for (const technologyName of technologyNames) {
            const [[technology]] = await pool.query(
                `SELECT id FROM technologies WHERE name = ?`,
                [technologyName]
            );
            if (!technology) continue;

            await pool.query(
                `
                    INSERT INTO hackathon_technologies (hackathonId, technologyId)
                    VALUES (?,?)
                `,
                [hackathonId, technology.id]
            );
        }
    }

    return result.insertId;
};

export default insertHackathonService;

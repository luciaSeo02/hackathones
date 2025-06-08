import getPool from '../../database/getPool.js';
import generateErrorUtils from '../../utils/generateErrorUtils.js';

const editHackathonService = async (id, data) => {
    const pool = await getPool();

    const {
        name,
        modality,
        location,
        onlineUrl,
        startDate,
        endDate,
        topicName,
        technologyNames,
    } = data;

    const [[topic]] = await pool.query(`SELECT id FROM topics WHERE name = ?`, [
        topicName,
    ]);

    if (!topic) throw generateErrorUtils('Tema no encontrado', 400);
    const topicId = topic.id;

    await pool.query(
        `
            UPDATE hackathons SET name = ?, modality = ?, location = ?, onlineUrl = ?, startDate = ?, endDate = ?, topicId = ? WHERE id = ?
        `,

        [name, modality, location, onlineUrl, startDate, endDate, topicId, id]
    );

    if (Array.isArray(technologyNames)) {
        await pool.query(
            `
            DELETE FROM hackathon_technologies WHERE hackathonId = ?
            `,

            [id]
        );

        for (const technologyName of technologyNames) {
            const [[technology]] = await pool.query(
                `SELECT id FROM technologies WHERE name = ?`,
                [technologyName]
            );

            if (!technology)
                throw generateErrorUtils('Tecnología no encontrada', 400);

            await pool.query(
                `
                INSERT INTO hackathon_technologies (hackathonId, technologyId) VALUES (?, ?)
                `,

                [id, technology.id]
            );
        }
    }
};

export default editHackathonService;

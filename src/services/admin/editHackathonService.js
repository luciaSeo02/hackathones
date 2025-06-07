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
        technologies,
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

    if (Array.isArray(technologies)) {
        await pool.query(
            `
            DELETE FROM hackathon_technologies WHERE hackathonId = ?
            `,

            [id]
        );

        for (const techId of technologies) {
            await pool.query(
                `
                INSERT INTO hackathon_technologies (hackathonId, technologyId) VALUES (?, ?)
                `,

                [id, techId]
            );
        }
    }
};

export default editHackathonService;

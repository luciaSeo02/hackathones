import getPool from '../../database/getPool.js';

const selectHackathonsService = async () => {
    
    const pool = await getPool();

    const [hackathons] = await pool.query(
        `
            SELECT
            h.id, h.name, h.description, h.modality, h.location, h.onlineUrl,
            h.startDate, h.endDate, t.name AS topic
            FROM hackathons h
            JOIN topics t ON h.topicId = t.id
            ORDER BY h.startDate DESC
        `
    );

    return hackathons;

};


export default selectHackathonsService;
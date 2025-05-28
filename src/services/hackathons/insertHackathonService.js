import getPool from '../../database/getPool.js';

const insertHackathonService = async ({
    name,
    description,
    modality,
    location,
    onlineUrl,
    startDate,
    endDate,
    topicId
}) => {
    
    const pool = await getPool();

    const [result] = await pool.query(
        `
            INSERT INTO hackathons
            (name, description, modality, location, onlineUrl, startDate, endDate, topicId)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `
    , [name, description, modality, location, onlineUrl, startDate, endDate, topicId]);
    
    return result.insertId;

};


export default insertHackathonService;
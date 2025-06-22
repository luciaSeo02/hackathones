import getPool from '../../database/getPool.js';
import selectAttachmentsByHackathonIdService from './selectAttachmentsByHackathonIdService.js';
import { HOST, PORT } from '../../../env.js';

const selectHackathonByIdService = async (id) => {
    const pool = await getPool();

    const [hackathons] = await pool.query(
        `
            SELECT
            h.id, h.name, h.description, h.modality, h.location, h.onlineUrl, 
            h.startDate, h.endDate, t.name AS topic, GROUP_CONCAT(DISTINCT tech.name) AS technolyNames
            FROM hackathons h
            JOIN topics t ON h.topicId = t.id
            LEFT JOIN hackathon_technologies ht ON ht.hackathonId = h.id
            LEFT JOIN technologies tech ON tech.id = ht.technologyId
            WHERE h.id = ?
        `,
        [id]
    );

    const hackathon = hackathons[0];

    if (!hackathon) return null;

    const attachments = await selectAttachmentsByHackathonIdService(id);
    hackathon.attachments = attachments.map((file) => ({
        url: `${HOST}:${PORT}/${file.fileUrl}`,
        type: file.fileType,
    }));

    return hackathon;
};

export default selectHackathonByIdService;
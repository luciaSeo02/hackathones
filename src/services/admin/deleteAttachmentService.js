import getPool from '../../database/getPool.js';
import generateErrorUtils from '../../utils/generateErrorUtils.js';
import { deleteHackathonAttachment } from '../../utils/photoUtils.js';

const deleteAttachmentService = async (hackathonId, fileId) => {
    const pool = await getPool();

    const [file] = await pool.query(
        `
            SELECT fileUrl FROM hackathon_attachments WHERE id = ? AND hackathonId = ?
        `,
        [fileId, hackathonId]
    );

    if (file.length === 0) throw generateErrorUtils('El archivo no existe', 404);

    await deleteHackathonAttachment(file[0].fileUrl);

    await pool.query(
        `
            DELETE FROM hackathon_attachments WHERE id = ? AND hackathonId = ?
        `,
        [fileId, hackathonId]
    );
}

export default deleteAttachmentService;
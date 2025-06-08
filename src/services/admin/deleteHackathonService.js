import fs from 'fs/promises';
import path from 'path';
import { UPLOAD_DIR } from '../../../env.js';
import getPool from '../../database/getPool.js';
import { deleteHackathonAttachment } from '../../utils/photoUtils.js';

const deleteHackathonService = async (hackathonId) => {
    const pool = await getPool();

    console.log('Borrando tecnologías...');
    await pool.query(
        `DELETE FROM hackathon_technologies WHERE hackathonId = ?`,
        [hackathonId]
    );

    console.log('Borrando adjuntos...');
    const [files] = await pool.query(
        `SELECT fileUrl FROM hackathon_attachments WHERE hackathonId = ?`,
        [hackathonId]
    );

    await pool.query(
        `DELETE FROM hackathon_attachments WHERE hackathonId = ?`,
        [hackathonId]
    );

    console.log('Borrando carpeta...');

    if (files.length) {
        for (let file of files) {
            await deleteHackathonAttachment(file.fileUrl);
        }
    }

    const folderPath = path.join(
        process.cwd(),
        `./src/${UPLOAD_DIR}/hackathons/${hackathonId}`
    );

    try {
        await fs.access(folderPath);
        const filesFolder = await fs.readdir(folderPath);
        if (filesFolder.length === 0) {
            await fs.rmdir(folderPath);
        }
    } catch (error) {
        if (error.code !== 'ENOENT') {
            console.error('Error al acceder a la carpeta:', error);
        }
    }

    console.log('Borrando hackathon...');

    const [result] = await pool.query(`DELETE FROM hackathons WHERE id = ?`, [
        hackathonId,
    ]);

    console.log(`Filas afectadas: ${result.affectedRows}`);

    if (result.affectedRows === 0) {
        throw new Error(
            `No se pudo eliminar el hackathon con id ${hackathonId}`
        );
    }
};
export default deleteHackathonService;

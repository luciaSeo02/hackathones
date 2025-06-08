import attachmentAdminHackathonService from '../../services/admin/attachmentAdminHackathonService.js';
import { saveHackathonAttachment } from '../../utils/photoUtils.js';
import generateErrorUtils from '../../utils/generateErrorUtils.js';

const attachmentAdminHackathonController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { fileType } = req.body;
        let { attachment } = req.files;

        if (!attachment) {
            throw generateErrorUtils('No se ha subido ningún archivo', 400);
        }

        if (!Array.isArray(attachment)) {
            attachment = [attachment];
        }

        for (const file of attachment) {
            const fileUrl = await saveHackathonAttachment(file, id, fileType);
            await attachmentAdminHackathonService(id, { fileUrl, fileType });
        }

        res.status(200).send({
            status: 'ok',
            message: 'Archivo añadido correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default attachmentAdminHackathonController;

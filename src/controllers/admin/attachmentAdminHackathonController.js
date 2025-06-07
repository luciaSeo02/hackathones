import attachmentAdminHackathonService from '../../services/admin/attachmentAdminHackathonService.js';
import { saveHackathonAttachment } from '../../utils/photoUtils.js';
import generateErrorUtils from '../../utils/generateErrorUtils.js';

const attachmentAdminHackathonController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { fileType } = req.body;
        const { attachment } = req.files;

        if (!attachment) {
            throw generateErrorUtils('No se ha subido ningún archivo', 400);
        }

        const fileUrl = await saveHackathonAttachment(attachment, id);

        await attachmentAdminHackathonService(id, { fileUrl, fileType });

        res.status(200).send({
            status: 'ok',
            message: 'Archivo añadido correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default attachmentAdminHackathonController;

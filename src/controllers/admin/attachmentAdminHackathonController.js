import attachmentAdminHackathonService from '../../services/admin/attachmentAdminHackathonService.js';

const attachmentAdminHackathonController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const { fileUrl, fileType } = req.body;
        
        await attachmentAdminHackathonService(id, { fileUrl, fileType });

        res.status(200).send({
            status: 'ok',
            message: 'Attachment añadido correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default attachmentAdminHackathonController;

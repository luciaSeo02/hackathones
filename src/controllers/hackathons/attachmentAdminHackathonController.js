import attachmentAdminHackathonService from '../../services/hackathons/attachmentAdminHackathonService.js';

const attachmentAdminHackathonController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const { nombre, url, descripcion } = req.body;

        await attachmentAdminHackathonService(id, { nombre, url, descripcion });

        res.status(200).send({
            status: 'ok',
            message: 'Attachment añadido correctamente',
        });

    } catch (error) {
        next(error);
    }
};

export default attachmentAdminHackathonController;

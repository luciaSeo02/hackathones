import editHackathonService from '../../services/admin/editHackathonService.js';

const editHackathonController = async (req, res, next) => {
    try {
        const { id } = req.params;

        await editHackathonService(id, req.body);

        res.status(200).send({
            status: 'ok',
            message: 'Hackathon actualizado correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default editHackathonController;

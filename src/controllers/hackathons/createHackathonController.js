import insertHackathonService from '../../services/hackathons/insertHackathonService.js';

const createHackathonController = async (req, res, next) => {
    try {
        const id = await insertHackathonService(req.body);

        res.status(200).send({
            status: 'ok',
            message: 'Hackathon creado correctamente',
            data: { id: id },
        });
    } catch (error) {
        next(error);
    }
};

export default createHackathonController;

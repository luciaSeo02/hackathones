import selectHackathonByIdService from '../../services/hackathons/selectHackathonByIdService.js';

const getHackathonByIdController = async (req, res, next) => {
    try {
        const hackathon = await selectHackathonByIdService(req.params.id);

        if (!hackathon) {
            return res
                .status(404)
                .json({ error: 'Ups! No hemos encontrado ningún Hackathon!' });
        }

        res.status(200).json({
            status: 'ok',
            data: hackathon,
        });
    } catch (error) {
        next(error);
    }
};

export default getHackathonByIdController;

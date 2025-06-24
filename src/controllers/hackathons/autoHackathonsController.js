import selectHackathonsAutoService from '../../services/hackathons/selectHackathonsAutoService.js';

const autoHackathonsController = async (req, res, next) => {
    try {
        const {
            query,
            topic,
            modality,
            startDate,
            endDate,
            technologies,
        } = req.query;

        if (!query) {
            return res.status(400).json({ status: 'error', message: 'Falta el parámetro query' });
        }

        const suggestions = await selectHackathonsAutoService({
            query,
            topic,
            modality,
            startDate,
            endDate,
            technologies,
        });

        res.status(200).json(suggestions);
    } catch (error) {
        next(error);
    }
};

export default autoHackathonsController;
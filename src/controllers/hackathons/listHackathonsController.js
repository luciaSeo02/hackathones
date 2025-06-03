import selectHackathonsService from '../../services/hackathons/selectHackathonsService.js';
import selectHackathonsWithFiltersService from '../../services/hackathons/selectHackathonsWithFiltersService.js';

const listHackathonsController = async (req, res, next) => {
    try {
        // const hackathons = await selectHackathonsService();

        const { topic, modality, startDate, endDate, technologies, orderBy } =
            req.query;

        const hackathons = await selectHackathonsWithFiltersService({
            topic,
            modality,
            startDate,
            endDate,
            technologies,
            orderBy,
        });

        if (hackathons.length === 0) {
            return res.status(200).json({
                status: 'ok',
                message:
                    'No se encontraron hackathones con los filtros proporcionados',
                data: [],
            });
        }

        res.status(200).json({
            status: 'ok',
            data: hackathons,
        });
    } catch (error) {
        next(error);
    }
};

export default listHackathonsController;

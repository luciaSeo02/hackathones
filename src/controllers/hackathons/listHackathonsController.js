import selectHackathonsWithFiltersService from '../../services/hackathons/selectHackathonsWithFiltersService.js';
import { HOST, PORT } from '../../../env.js';
import selectAttachmentsByHackathonIdService from '../../services/hackathons/selectAttachmentsByHackathonIdService.js';

const listHackathonsController = async (req, res, next) => {
    try {
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

        for (const hackathon of hackathons) {
            const attachments = await selectAttachmentsByHackathonIdService(
                hackathon.id
            );

            hackathon.attachments = attachments.map((file) => ({
                url: `${HOST}:${PORT}/${file.fileUrl}`,
                type: file.fileType,
            }));
        }

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

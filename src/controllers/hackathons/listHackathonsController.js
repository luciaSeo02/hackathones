import selectHackathonsWithFiltersService from '../../services/hackathons/selectHackathonsWithFiltersService.js';
import { HOST, PORT } from '../../../env.js';
import selectAttachmentsByHackathonIdService from '../../services/hackathons/selectAttachmentsByHackathonIdService.js';

const listHackathonsController = async (req, res, next) => {
    try {
        const {
            search, 
            topic,
            modality,
            startDate,
            endDate,
            technologies,
            orderBy,
            isFavourite,
            limit = 24,
            page = 1,
        } = req.query;

        //Servicio listar hackathones con filtros
        const { hackathons, total } = await selectHackathonsWithFiltersService({
            search, 
            topic,
            modality,
            startDate,
            endDate,
            technologies,
            orderBy,
            isFavourite,
            limit: Number(limit),
            page: Number(page),
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
            total,
        });
    } catch (error) {
        next(error);
    }
};

export default listHackathonsController;

import getInscriptionUser from '../../services/inscriptions/getInscriptionUserService.js';
import selectAttachmentsByHackathonIdService from '../../services/hackathons/selectAttachmentsByHackathonIdService.js';
import { HOST, PORT } from '../../../env.js';

const listInscriptionUser = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { limit = 24, page = 1 } = req.query;

        const { inscriptions, total } = await getInscriptionUser(
            userId,
            limit,
            page
        );

        for (const hackathon of inscriptions) {
            const attachments = await selectAttachmentsByHackathonIdService(
                hackathon.id
            );

            hackathon.attachments = attachments.map((file) => ({
                url: `${HOST}:${PORT}/${file.fileUrl}`,
                type: file.fileType,
            }));
        }

        res.status(200).json({
            inscriptions,
            total,
        });
    } catch (error) {
        console.error('Error en listInscriptionUser:', error);
        next(error);
    }
};

export default listInscriptionUser;

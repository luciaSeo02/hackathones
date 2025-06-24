import getInscriptionUser from '../../services/inscriptions/getInscriptionUserService.js';
import selectAttachmentsByHackathonIdService from '../../services/hackathons/selectAttachmentsByHackathonIdService.js';
import { HOST, PORT } from '../../../env.js';

const listInscriptionUser = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const inscriptions = await getInscriptionUser(userId);

        for (const hackathon of inscriptions) {
            const attachments = await selectAttachmentsByHackathonIdService(
                hackathon.id
            );

            hackathon.attachments = attachments.map((file) => ({
                url: `${HOST}:${PORT}/${file.fileUrl}`,
                type: file.fileType,
            }));
        }

        console.log(inscriptions);

        res.status(200).json({ inscriptions });
    } catch (error) {
        console.error('Error en listInscriptionUser:', error);
        next(error);
    }
};

export default listInscriptionUser;

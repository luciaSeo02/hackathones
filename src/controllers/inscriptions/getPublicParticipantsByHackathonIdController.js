import getPublicParticipantsByHackathonId from '../../services/inscriptions/getPublicParticipantsByHackathonId.js';

const getPublicParticipantsByHackathonIdController = async (req, res, next) => {
    try {
        const { hackathonId } = req.params;
        const participants =
            await getPublicParticipantsByHackathonId(hackathonId);
        res.json({
            status: 'ok',
            data: { participants },
        });
    } catch (error) {
        next(error);
    }
};

export default getPublicParticipantsByHackathonIdController;

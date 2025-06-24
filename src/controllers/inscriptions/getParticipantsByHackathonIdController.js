import getParticipantsByHackathonId from '../../services/inscriptions/getUserClassification.js';

const getParticipantsByHackathonIdController = async (req, res, next) => {
  try {console.log('hackathonId:', req.params.hackathonId);
    const { hackathonId } = req.params;
    const participants = await getParticipantsByHackathonId(hackathonId);
    res.json({ data: participants });
  } catch (error) {
    next(error);
  }
};

export default getParticipantsByHackathonIdController;
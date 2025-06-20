import getPeopleInscriptionsToMyHackathonsService from '../../services/inscriptions/getPeopleInscriptionsToMyHackathonsService.js';

const getPeopleInscriptionsToMyHackathonsController = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const inscriptions = await getPeopleInscriptionsToMyHackathonsService(userId);
    res.json({ inscriptions });
  } catch (err) {
    next(err);
  }
};

export default getPeopleInscriptionsToMyHackathonsController;
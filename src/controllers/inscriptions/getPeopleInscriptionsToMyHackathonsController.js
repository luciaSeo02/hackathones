import getPeopleInscriptionsToMyHackathonsService from '../../services/inscriptions/getPeopleInscriptionsToMyHackathonsService.js';

const getPeopleInscriptionsToMyHackathonsController = async (
    req,
    res,
    next
) => {
    try {
        const { id: userId } = req.user;
        const { limit = 24, page = 1 } = req.query;

        const { inscriptions, total } =
            await getPeopleInscriptionsToMyHackathonsService(
                userId,
                limit,
                page
            );
        res.json({
            inscriptions,
            total,
        });
    } catch (err) {
        next(err);
    }
};

export default getPeopleInscriptionsToMyHackathonsController;

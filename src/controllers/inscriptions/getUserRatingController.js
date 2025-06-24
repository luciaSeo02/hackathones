import selectUserRatingService from '../../services/inscriptions/selectUserRatingService.js';

const getUserRatingController = async (req, res, next) => {
    try {
        const { hackathonId } = req.params;
        const userId = req.user.id;

        const rating = await selectUserRatingService(hackathonId, userId);

        console.log('getUserRatingController -> hackathonId:', hackathonId);
        console.log('getUserRatingController -> userId:', req.user.id);

        res.status(200).json({ rating });
    } catch (error) {
        next(error);
    }
};

export default getUserRatingController;

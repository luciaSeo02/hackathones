import addRating from '../../services/inscriptions/addRanting.js';

const rateHackathon = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { hackathonId } = req.params;
        const { rating } = req.body;

        await addRating({ userId, hackathonId: Number(hackathonId), rating: Number(rating) });

        res.status(201).json({
            message: '¡Valoración registrada correctamente!',
        });
    } catch (error) {
        next(error);
    }
};

export default rateHackathon;
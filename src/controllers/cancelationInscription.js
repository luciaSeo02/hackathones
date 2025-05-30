import deleteInscription from '../services/deleteInscription.js';

const cancelInscription = async (req, res, next) => {
    try {
        const { userId, hackathonId } = req.params;

        await deleteInscription({ userId, hackathonId });

        res.status(200).json({
            message: 'Inscripción cancelada correctamente',
        });
    } catch (err) {
        next(err);
    }
};

export default cancelInscription;

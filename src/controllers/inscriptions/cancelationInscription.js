import deleteInscription from '../../services/inscriptions/deleteInscription.js';

const cancelInscription = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { hackathonId } = req.params;

        await deleteInscription({ userId, hackathonId });

        res.status(200).json({
            message: 'Inscripción cancelada correctamente',
        });
    } catch (err) {
        next(err);
    }
};

export default cancelInscription;

import insertNewInscription from '../../services/inscriptions/addInscriptionService.js';

const newInscription = async (req, res, next) => {
    try {
        const { id: userId } = req.user;
        const { hackathonId } = req.params;

        await insertNewInscription({ userId, hackathonId });

        res.status(201).json({ message: 'Te has inscrito correctamente ;)' });
    } catch (err) {
        next(err);
    }
};

export default newInscription;

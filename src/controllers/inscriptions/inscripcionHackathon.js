// codigo para hacer un inscripcion

import insertNewInscription from '../../services/inscriptions/addInscription.js'

const newInscription = async (req, res, next) => {
    try {
        const { id: userId } = req.user;
        const { hackathonId } = req.params;

        await insertNewInscription({ userId, hackathonId });

        res.status(201).json({ message: 'te has inscripto correctamente ;)' });
    } catch (err) {
        next(err);
    }
};

export default newInscription;

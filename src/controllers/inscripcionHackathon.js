// codigo para hacer un inscripcion

import addInscription from '../services/addInscription.js';

const newInscription = async (req, res, next) => {
    try {
        const { userId, hackathonId } = req.body;

        await addInscription({ userId, hackathonId });

        res.status(201).json({ message: 'te has inscripto correctamente ;)' });
    } catch (err) {
        next(err);
    }
};

export default newInscription;

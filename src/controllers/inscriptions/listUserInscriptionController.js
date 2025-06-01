import getInscriptionUser from '../../services/inscriptions/getInscriptionUserService.js';

const listInscriptionUser = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const inscriptions = await getInscriptionUser(userId);

        res.status(200).json({ inscriptions });
    } catch (error) {
        next(error);
    }
};

export default listInscriptionUser;

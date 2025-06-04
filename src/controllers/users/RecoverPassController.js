import Randomstring from 'randomstring';
import selectUserByEmailService from '../../services/users/selectUserByEmailService.js';
import generateErrorsUtils from '../../utils/generateErrorUtils.js';
import RecoverPassService from '../../services/users/RecoverPassService.js';

const RecoverPassController = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await selectUserByEmailService(email);

        if (!user) throw generateErrorsUtils('Email no registrado', 404);

        const recoverPassCode = Randomstring.generate(10);

        await RecoverPassService(email, recoverPassCode);

        res.send({
            status: 'ok',
            message: 'Correo de recuperación enviado',
        });
    } catch (error) {
        next(error);
    }
};

export default RecoverPassController;

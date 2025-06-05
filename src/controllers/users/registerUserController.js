import randomstring from 'randomstring';
import generateErrorsUtils from '../../utils/generateErrorUtils.js';
import insertUserService from '../../services/users/insertUserService.js';

const registerUserController = async (req, res, next) => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username)
            throw generateErrorsUtils(
                'Se esperaba email, username y contraseña',
                400
            );

        const registrationCode = randomstring.generate(15);

        await insertUserService(email, password, registrationCode, username);

        res.send({
            status: 'ok',
            message:
                'Usuario creado correctamente. Verifique su cuenta mediante el email recibido',
        });
    } catch (error) {
        next(error);
    }
};

export default registerUserController;

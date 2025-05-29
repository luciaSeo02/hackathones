import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import generateErrorsUtils from '../../utils/generateErrorUtils.js';
import selectUserByEmailService from '../../services/users/selectUserByEmailService.js';

const loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            throw generateErrorsUtils('Se esperaba email y password', 400);

        const user = await selectUserByEmailService(email);

        let validPassword;

        if (user) {
            validPassword = await bcrypt.compare(password, user.password);
        }

        if (!user || !validPassword)
            throw generateErrorsUtils('Usuario o contraseña incorrecta', 401);

        if (!user.active)
            throw generateErrorsUtils('Usuario pendiente de activacion', 403);

        const tokenInfo = {
            id: user.id,
            role: user.role,
        };

        const token = jwt.sign(tokenInfo, process.env.SECRET, {
            expiresIn: '3d',
        });

        res.send({
            status: 'ok',
            data: {
                token,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default loginUserController;

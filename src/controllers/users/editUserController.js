import updateUserService from '../../services/users/updateUserService.js';
import generateErrorUtils from '../../utils/generateErrorUtils.js';

const editUserController = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { email, username, firstName, lastName, avatar } = req.body || {};

        if (req.user.role === 'admin') {
            throw generateErrorUtils('No puedes realizar esta acción', 403);
        }

        await updateUserService(
            email,
            username,
            firstName,
            lastName,
            avatar,
            id
        );

        res.send({
            status: 'ok',
            message: 'Usuario modificado correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default editUserController;

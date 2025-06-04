import updateUserService from '../../services/users/updateUserService.js';

const editUserController = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { email, username, password, firstName, lastName, avatar } =
            req.body || {};

        await updateUserService(
            email,
            username,
            firstName,
            lastName,
            avatar,
            password,
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

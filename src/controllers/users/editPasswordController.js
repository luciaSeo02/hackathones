import updatePasswordService from '../../services/users/updatePasswordService.js';

const editPasswordController = async (req, res, next) => {
    try {
        const { email, recoverPassCode, newPassword } = req.body;

        await updatePasswordService(email, recoverPassCode, newPassword);

        res.send({
            status: 'ok',
            message: 'Contraseña actualizada correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default editPasswordController;

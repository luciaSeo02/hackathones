import changePasswordService from '../../services/users/changePasswordService.js';

const changePasswordController = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { currentPassword, newPassword } = req.body || {};

        await changePasswordService(id, currentPassword, newPassword);

        res.send({
            status: 'ok',
            message: 'Contraseña modificada correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default changePasswordController;

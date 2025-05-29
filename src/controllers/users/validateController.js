import updateUserCode from "../../../services/updateUserCode.js";

const validateController = async (req, res, next) => {
    try {
        const { registrationCode } = req.params;

        await updateUserCode(registrationCode);

        res.send({
            status: 'ok',
            message: 'Usuario validado correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default validateController;

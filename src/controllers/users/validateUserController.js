import updateUserRegCodeService from "../../services/users/updateUserRegCodeService.js";

const validateUserController = async (req, res, next) => {
    try {
        
        const { registrationCode } = req.params;

        await updateUserRegCodeService(registrationCode);

        res.send({
            status: 'ok',
            message: 'Usuario activado!!'
        });

    } catch (error) {
        next(error)
    }
}

export default validateUserController;
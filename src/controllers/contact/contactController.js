import insertContactMessageService from '../../services/contact/insertContactMessageService.js';
import generateErrorUtils from '../../utils/generateErrorUtils.js';

const contactController = async (req, res, next) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message)
            throw generateErrorUtils(
                'Faltan datos para poder enviar el mensaje',
                400
            );

        await insertContactMessageService({ name, email, message });

        res.status(201).json({
            status: 'ok',
            message: 'Mensaje enviado correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default contactController;

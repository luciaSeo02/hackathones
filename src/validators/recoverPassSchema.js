import Joi from 'joi';

const recoverPassSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': 'El email es obligatorio',
        'string.email': 'El email debe tener un formato válido',
    }),
});

export default recoverPassSchema;

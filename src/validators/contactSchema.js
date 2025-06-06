import Joi from 'joi';

const contactSchema = Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
        'string.empty': 'El nombre es obligatorio',
        'string.min': 'El nombre debe tener al menos 2 caracteres',
        'string.max': 'El nombre no puede tener más de 100 caracteres',
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'El email es obligatorio',
        'string.email': 'El email debe tener un formato válido',
    }),
    message: Joi.string().min(10).max(1000).required().messages({
        'string.empty': 'El mensaje es obligatorio',
        'string.min': 'El mensaje debe tener al menos 10 caracteres',
        'string.max': 'El mensaje no puede tener más de 1000 caracteres',
    }),
});

export default contactSchema;

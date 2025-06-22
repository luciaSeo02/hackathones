import Joi from 'joi';

const editUserSchema = Joi.object({
    email: Joi.string().email().messages({
        'string.email': 'El email debe tener un formato válido',
    }),

    username: Joi.string().min(3).max(30).messages({
        'string.min': 'El nombre de usuario debe tener al menos 3 caracteres',
        'string.max':
            'El nombre de usuario no puede tener más de 30 caracteres',
    }),

    firstName: Joi.string().max(50).allow('').messages({
        'string.max': 'El nombre no puede tener más de 50 caracteres',
    }),

    lastName: Joi.string().max(50).allow('').messages({
        'string.max': 'El apellido no puede tener más de 50 caracteres',
    }),
});

export default editUserSchema;

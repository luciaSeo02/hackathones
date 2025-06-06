import Joi from 'joi';

const editPasswordSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': 'El email es obligatorio',
        'string.email': 'El email debe tener un formato válido',
    }),
    recoverPassCode: Joi.string().required().messages({
        'string.empty': 'El código de recuperación es obligatorio',
    }),
    newPassword: Joi.string()
        .min(8)
        .pattern(
            new RegExp(
                '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=]).+$'
            )
        )
        .required()
        .messages({
            'string.empty': 'La nueva contraseña es obligatoria',
            'string.min':
                'La nueva contraseña debe tener al menos 8 caracteres',
            'string.pattern.base':
                'La nueva contraseña debe incluir al menos una mayúscula, una minúscula, un número y un carácter especial',
        }),
});

export default editPasswordSchema;

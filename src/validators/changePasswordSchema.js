import Joi from 'joi';

const changePasswordSchema = Joi.object({
    currentPassword: Joi.string().required().messages({
        'string.empty': 'La contraseña actual es obligatoria',
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

export default changePasswordSchema;

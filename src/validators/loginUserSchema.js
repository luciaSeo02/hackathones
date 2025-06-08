import Joi from 'joi';

const loginUserSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': 'El email es obligatorio',
        'string.email': 'El email debe ser válido',
    }),
    password: Joi.string()
        .min(8)
        .pattern(
            new RegExp(
                '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=]).+$'
            )
        )
        .required()
        .messages({
            'string.empty': 'La contraseña es obligatoria',
            'string.min': 'La contraseña debe tener al menos 8 caracteres',
            'string.pattern.base':
                'La contraseña debe incluir al menos una mayúscula, una minúscula, un número y un carácter especial',
        }),
    rememberMe: Joi.boolean().optional(),
});

export default loginUserSchema;

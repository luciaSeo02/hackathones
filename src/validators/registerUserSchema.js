import Joi from 'joi';

const registerUserSchema = Joi.object({
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
    username: Joi.string().min(3).max(30).required().messages({
        'string.empty': 'El nombre de usuario es obligatorio',
        'string.min': 'El nombre de usuario debe tener al menos 3 caracteres',
        'string.max': 'El nombre de usuario no puede superar los 30 caracteres',
    }),
});

export default registerUserSchema;

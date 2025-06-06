import Joi from 'joi';

const publishRankingSchema = Joi.object({
    userId: Joi.number().integer().positive().required().messages({
        'number.integer': 'El ID de usuario debe ser un número entero',
        'number.positive': 'El ID de usuario debe ser un número positivo',
        'any.required': 'El ID de usuario es obligatorio',
    }),
    position: Joi.number().integer().positive().required().messages({
        'number.integer': 'La posición debe ser un número entero',
        'number.positive': 'La posición debe ser un número positivo',
        'any.required': 'La posición es obligatoria',
    }),
});

export default publishRankingSchema;

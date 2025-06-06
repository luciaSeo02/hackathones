import Joi from 'joi';

const rateHackathonSchema = Joi.object({
    rating: Joi.number().integer().min(1).max(5).required().messages({
        'number.min': 'La valoración debe ser al menos 1',
        'number.max': 'La valoración no puede ser mayor que 5',
        'any.required': 'La valoración es obligatoria',
    }),
});

export default rateHackathonSchema;

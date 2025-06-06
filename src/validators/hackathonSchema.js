import Joi from 'joi';

const hackathonSchema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
        'string.empty': 'El nombre es obligatorio',
        'string.min': 'El nombre debe tener al menos 3 caracteres',
        'string.max': 'El nombre no puede superar los 100 caracteres',
    }),

    description: Joi.string().min(10).max(500).required().messages({
        'string.empty': 'La descripción es obligatoria',
        'string.min': 'La descripción debe tener al menos 10 caracteres',
        'string.max': 'La descripción no puede superar los 500 caracteres',
    }),

    modality: Joi.string().valid('online', 'onsite').required().messages({
        'any.only': 'La modalidad debe ser "online" o "onsite"',
        'string.empty': 'La modalidad es obligatoria',
    }),

    location: Joi.string()
        .min(10)
        .max(100)
        .when('modality', {
            is: 'onsite',
            then: Joi.required(),
            otherwise: Joi.allow('', null),
        })
        .messages({
            'string.empty': 'La ubicación es obligatoria para modalidad onsite',
            'string.min': 'La ubicación debe tener al menos 10 caracteres',
            'string.max': 'La ubicación no puede superar los 100 caracteres',
        }),

    onlineUrl: Joi.string()
        .min(10)
        .max(100)
        .uri()
        .when('modality', {
            is: 'online',
            then: Joi.required(),
            otherwise: Joi.allow('', null),
        })
        .messages({
            'string.empty':
                'La URL online es obligatoria para modalidad online',
            'string.min': 'La URL online debe tener al menos 10 caracteres',
            'string.max': 'La URL online no puede superar los 100 caracteres',
            'string.uri': 'La URL online debe tener un formato válido',
        }),

    startDate: Joi.date().iso().required().messages({
        'date.base': 'La fecha de inicio debe ser una fecha válida',
        'date.format': 'La fecha de inicio debe tener formato ISO',
        'any.required': 'La fecha de inicio es obligatoria',
    }),

    endDate: Joi.date()
        .iso()
        .greater(Joi.ref('startDate'))
        .required()
        .messages({
            'date.base': 'La fecha de fin debe ser una fecha válida',
            'date.format': 'La fecha de fin debe tener formato ISO',
            'date.greater':
                'La fecha de fin debe ser posterior a la fecha de inicio',
            'any.required': 'La fecha de fin es obligatoria',
        }),

    topicName: Joi.string().required().messages({
        'string.empty': 'El tema es obligatorio',
    }),

    technologyNames: Joi.array()
        .items(Joi.string())
        .default([])
        .required()
        .messages({
            'any.required': 'Las tecnologías son obligatorias',
        }),
});

export default hackathonSchema;

// Esquema que valida los datos de un hackathon, asegurando que:
// - Un nombre tenga entre 3 y 100 caracteres.
// - La descripción tenga entre 10 y 500 caracteres.
// - La modalidad sea 'online' o 'onsite'.
// - La ubicación y la URL online sean opcionales.
// - Las fechas de inicio y fin sean válidas y la fecha de fin sea posterior a la de inicio.
// - El ID del tema sea un número entero.

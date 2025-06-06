import Joi from 'joi';

const hackathonSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(500).required(),
    modality: Joi.string().valid('online', 'onsite').required(),
    location: Joi.string().min(10).max(100).allow('', null),
    onlineUrl: Joi.string().min(10).max(100).uri().allow('', null),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().greater(Joi.ref('startDate')).required(),
    topicId: Joi.number().integer().required(),
});

export default hackathonSchema;

// Esquema que valida los datos de un hackathon, asegurando que:
// - Un nombre tenga entre 3 y 100 caracteres.
// - La descripción tenga entre 10 y 500 caracteres.
// - La modalidad sea 'online' o 'onsite'.
// - La ubicación y la URL online sean opcionales.
// - Las fechas de inicio y fin sean válidas y la fecha de fin sea posterior a la de inicio.
// - El ID del tema sea un número entero.

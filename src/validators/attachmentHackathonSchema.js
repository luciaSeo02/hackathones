import Joi from 'joi';

const attachmentSchema = Joi.object({
    fileType: Joi.string().valid('image', 'doc').required().messages({
        'string.empty': 'El tipo de archivo no puede estar vacío',
        'any.only': 'El tipo de archivo debe ser "image" o "doc"',
    }),
});

export default attachmentSchema;

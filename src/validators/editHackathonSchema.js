import Joi from 'joi';

const editHackathonSchema = Joi.object({
    name: Joi.string().min(3).max(100),
    description: Joi.string().min(10).max(500),
    modality: Joi.string().valid('online', 'onsite'),
    location: Joi.string().min(3).max(100).allow('', null),
    onlineUrl: Joi.string().min(10).max(100).uri().allow('', null),
    startDate: Joi.date().iso(),
    endDate: Joi.date().iso().greater(Joi.ref('startDate')),
    topicName: Joi.string(),
    technologyNames: Joi.array().items(Joi.string()),
});

export default editHackathonSchema;

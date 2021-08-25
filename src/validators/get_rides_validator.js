const Joi = require('joi');

const schema = Joi.object({
    page: Joi.number()
        .integer()
        .min(0)
        .required()
        .error(new Error('page must be an integer')),
    page_size: Joi.number()
        .integer()
        .min(0)
        .max(100)
        .required()
        .error(new Error('page size must be an integer')),
});

module.exports = schema;

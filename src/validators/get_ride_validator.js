const Joi = require('joi');

const schema = Joi.object({
    id: Joi.number()
        .integer()
        .min(0)
        .required()
        .error(new Error('id must be an integer')),
});

module.exports = schema;

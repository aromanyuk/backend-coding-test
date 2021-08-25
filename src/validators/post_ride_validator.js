const Joi = require('joi');

const schema = Joi.object({
    start_lat: Joi.number()
        .min(-90)
        .max(90)
        .required()
        .error(new Error('Start latitude must be between -90 to 90 degrees')),
    start_long: Joi.number()
        .min(-180)
        .max(180)
        .required()
        .error(new Error('Start longitude must be between -180 to 180 degrees')),
    end_lat: Joi.number()
        .min(-90)
        .max(90)
        .required()
        .error(new Error('End latitude must be between -90 to 90 degrees')),
    end_long: Joi.number()
        .min(-180)
        .max(180)
        .required()
        .error(new Error('End longitude must be between -180 to 180 degrees')),
    rider_name: Joi.string().required()
        .error(new Error('Rider name must be a non empty string')),
    driver_name: Joi.string().required()
        .error(new Error('Driver name must be a non empty string')),
    driver_vehicle: Joi.string().required()
        .error(new Error('Vehicle name must be a non empty string')),
});

module.exports = schema;

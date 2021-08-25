const logger = require('../logger');
const Ride = require('../db/ride');
const validator = require('../validators/get_ride_validator');

/**
 * Handle request for single ride by ID
 * @param {Number} req.params.id
 * @param {*} res 
 */
module.exports = async (req, res) => {
    const { error } = validator.validate(req.params);
    if(error) {
        return res.send({
            error_code: 'VALIDATION_ERROR',
            message: error.message,
        });
    }
    const id = Number(req.params.id);
    
    let reply;
    try {
        const result = await Ride.getByID(id);
        reply = result;
        if(result.length === 0) {
            reply = {
                error_code: 'RIDES_NOT_FOUND_ERROR',
                message: 'Could not find any rides'
            };
        }
    } catch (error) {
        logger.error(`Error ${error.message}`);
        reply = {
            error_code: 'SERVER_ERROR',
            message: 'Unknown error'
        };
    }

    res.send(reply);
};

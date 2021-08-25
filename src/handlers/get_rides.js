const logger = require('../logger');
const Ride = require('../db/ride');
const validator = require('../validators/get_rides_validator');

/**
 * Handle request for list of rides with pagination
 * @param {Number} req.query.page
 * @param {Number} req.query.page_size
 * @param {*} res 
 */
module.exports = async (req, res) => {
    const { error } = validator.validate(req.query);
    if(error) {
        return res.send({
            error_code: 'VALIDATION_ERROR',
            message: error.message,
        });
    }
    const page = Number(req.query.page);
    const pageSize = Number(req.query.page_size);
    
    let reply;
    try {
        const result = await Ride.get({ page, pageSize });
        reply = result;
        if(result.length === 0) {
            reply = {
                error_code: 'RIDES_NOT_FOUND_ERROR',
                message: 'Could not find any rides'
            };
        }
    } catch(error) {
        logger.error(`Error ${error.message}`);
        reply = {
            error_code: 'SERVER_ERROR',
            message: 'Unknown error'
        };
    }

    res.send(reply);
};

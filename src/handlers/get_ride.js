const logger = require('../logger');
const Ride = require('../db/ride');

module.exports = async (req, res) => {
    const { id } = req.params;
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

const logger = require('../logger');
const Ride = require('../db/ride');

module.exports = async (req, res) => {
    const page = Number(req.query.page);
    const pageSize = Number(req.query.page_size);
    if(Number.isNaN(page) || Number.isNaN(pageSize)) {
        return res.send({
            error_code: 'VALIDATION_ERROR',
            message: 'page and page_size should be numbers'
        });
    }
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

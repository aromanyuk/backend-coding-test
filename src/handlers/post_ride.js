const logger = require('../logger');
const Ride = require('../db/ride');
const validator = require('../validators/post_ride_validator');

/**
 * Create a ride using request payload
 * @param {Number} req.body.start_lat 
 * @param {Number} req.body.start_long 
 * @param {Number} req.body.end_lat 
 * @param {Number} req.body.end_long 
 * @param {String} req.body.rider_name 
 * @param {String} req.body.driver_name 
 * @param {String} req.body.driver_vehicle 
 * @param {*} res 
 */
module.exports = async (req, res) => {
    const { error } = validator.validate(req.body);
    if(error) {
        return res.send({
            error_code: 'VALIDATION_ERROR',
            message: error.message,
        });
    }
    const {
        start_lat: startLat,
        start_long: startLong,
        end_lat: endLat,
        end_long: endLong,
        rider_name: riderName,
        driver_name: driverName,
        driver_vehicle: driverVehicle,
    } = req.body;
    
    let reply;
    try {
        const result = await Ride.create({
            startLat,
            startLong,
            endLat,
            endLong,
            riderName,
            driverName,
            driverVehicle
        });
        reply = result;
    } catch(error) {
        logger.error(`Error ${error.message}`);
        reply = {
            error_code: 'SERVER_ERROR',
            message: 'Unknown error'
        };
    }
    res.send(reply);
};

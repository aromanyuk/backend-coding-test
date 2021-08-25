const logger = require('../logger');
const Ride = require('../db/ride');

module.exports = async (req, res) => {
    const startLat= Number(req.body.start_lat);
    const startLong = Number(req.body.start_long);
    const endLat = Number(req.body.end_lat);
    const endLong = Number(req.body.end_long);
    const riderName = req.body.rider_name;
    const driverName = req.body.driver_name;
    const driverVehicle = req.body.driver_vehicle;

    if (startLat < -90 || startLat > 90 || startLong < -180 || startLong > 180) {
        return res.send({
            error_code: 'VALIDATION_ERROR',
            message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
        });
    }

    if (endLat < -90 || endLat > 90 || endLong < -180 || endLong > 180) {
        return res.send({
            error_code: 'VALIDATION_ERROR',
            message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
        });
    }

    if (typeof riderName !== 'string' || riderName.length < 1) {
        return res.send({
            error_code: 'VALIDATION_ERROR',
            message: 'Rider name must be a non empty string'
        });
    }

    if (typeof driverName !== 'string' || driverName.length < 1) {
        return res.send({
            error_code: 'VALIDATION_ERROR',
            message: 'Driver name must be a non empty string'
        });
    }

    if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
        return res.send({
            error_code: 'VALIDATION_ERROR',
            message: 'Vehicle name must be a non empty string'
        });
    }
    
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

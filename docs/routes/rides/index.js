const getRides = require('./get-rides');
const getRide = require('./get-ride');
const postRide = require('./post-ride');

module.exports = {
    '/rides':{
        ...getRides,
        ...postRide,
    },
    '/rides/{id}':{
        ...getRide,
    }
};

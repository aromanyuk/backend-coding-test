const rides = require('./rides');
const health = require('./health');

module.exports = {
    paths: {
        ...rides,
        ...health,
    }
};

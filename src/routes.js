const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const getRideHandler = require('./handlers/get_ride');
const getRidesHandler = require('./handlers/get_rides');
const postRideHandler = require('./handlers/post_ride');

module.exports = (app) => {
    app.get('/health', (req, res) => res.send('Healthy'));

    app.post('/rides', jsonParser, postRideHandler);

    app.get('/rides', getRidesHandler);
    
    app.get('/rides/:id', getRideHandler);

    return app;
};

'use strict';

const express = require('express');
const swagger = require('swagger-ui-express');
const docs = require('./docs');
const routes = require('./src/routes');
const logger = require('./src/logger');
const db = require('./src/db');

const app = express();
const port = 8010;

async function start() {
    await db.init();

    routes(app);

    // Init swagger documentation route
    app.use('/docs', swagger.serve, swagger.setup(docs));
    app.listen(port, () => logger.info(`App started and listening on port ${port}`));
}

start();

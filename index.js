'use strict';

const express = require('express');
const swagger = require('swagger-ui-express');
const docs = require('./docs');
const routes = require('./src/app');
const logger = require('./src/logger');

const app = express();
const port = 8010;

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const buildSchemas = require('./src/schemas');

db.serialize(() => {
    buildSchemas(db);

    routes({ app, db });
    app.use('/docs', swagger.serve, swagger.setup(docs));

    app.listen(port, () => logger.info(`App started and listening on port ${port}`));
});
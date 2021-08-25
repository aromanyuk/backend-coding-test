'use strict';

const request = require('supertest');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
const express = require('express');
const app = express();

const routes = require('../src/app')({ app, db });
const buildSchemas = require('../src/schemas');

describe('API tests', () => {
    before((done) => {
        db.serialize((err) => { 
            if (err) {
                return done(err);
            }

            buildSchemas(db);

            done();
        });
    });

    describe('GET /health', () => {
        it('should return health', (done) => {
            request(routes)
                .get('/health')
                .expect('Content-Type', /text/)
                .expect(200, done);
        });
    });
});
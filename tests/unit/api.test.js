/* eslint-disable no-undef */
const request = require('supertest');
const assert = require('assert');
const db = require('../../src/db');
const express = require('express');
const app = express();

const routes = require('../../src/routes')(app);

let rideID;
describe('API tests', () => {
    before((done) => {
        db.init().then(done);
    });

    describe('GET /health', () => {
        it('should return health', (done) => {
            request(routes)
                .get('/health')
                .expect('Content-Type', /text/)
                .expect(200, done);
        });
    });

    describe('POST /rides', () => {
        it('should reply with error for invalid start_lat', (done) => {
            request(routes)
                .post('/rides')
                .send({
                    "start_lat": 999,
                    "start_long": 999,
                    "end_lat": 41.874,
                    "end_long": -102.9923,
                    "rider_name": "Morty",
                    "driver_name": "Rick",
                    "driver_vehicle": "DeLorean DMC-12"
                })
                .expect(200)
                .expect({
                    error_code: 'VALIDATION_ERROR',
                    message: 'Start latitude must be between -90 to 90 degrees'
                }, done);
        });
        it('should reply with error for invalid end_long', (done) => {
            request(routes)
                .post('/rides')
                .send({
                    "start_lat": 41.874,
                    "start_long": -102.9923,
                    "end_lat": -80.327,
                    "end_long": 999,
                    "rider_name": "Morty",
                    "driver_name": "Rick",
                    "driver_vehicle": "DeLorean DMC-12"
                })
                .expect(200)
                .expect({
                    error_code: 'VALIDATION_ERROR',
                    message: 'End longitude must be between -180 to 180 degrees'
                }, done);
        });
        it('should reply with error for invalid rider_name', (done) => {
            request(routes)
                .post('/rides')
                .send({
                    "start_lat": 41.874,
                    "start_long": -102.9923,
                    "end_lat": 41.874,
                    "end_long": -102.9923,
                    "rider_name": "",
                    "driver_name": "Rick",
                    "driver_vehicle": "DeLorean DMC-12"
                })
                .expect(200)
                .expect({
                    error_code: 'VALIDATION_ERROR',
                    message: 'Rider name must be a non empty string'
                }, done);
        });
        it('should reply with error for invalid driver_name', (done) => {
            request(routes)
                .post('/rides')
                .send({
                    "start_lat": 41.874,
                    "start_long": -102.9923,
                    "end_lat": 41.874,
                    "end_long": -102.9923,
                    "rider_name": "Morty",
                    "driver_name": 42,
                    "driver_vehicle": "DeLorean DMC-12"
                })
                .expect(200)
                .expect({
                    error_code: 'VALIDATION_ERROR',
                    message: 'Driver name must be a non empty string'
                }, done);
        });
        it('should reply with error for invalid driver_vehicle', (done) => {
            request(routes)
                .post('/rides')
                .send({
                    "start_lat": 41.874,
                    "start_long": -102.9923,
                    "end_lat": 41.874,
                    "end_long": -102.9923,
                    "rider_name": "Morty",
                    "driver_name": "Rick",
                    "driver_vehicle": ""
                })
                .expect(200)
                .expect({
                    error_code: 'VALIDATION_ERROR',
                    message: 'Vehicle name must be a non empty string'
                }, done);
        });
        it('should create ride', (done) => {
            request(routes)
                .post('/rides')
                .send({
                    "start_lat": 41.874,
                    "start_long": -102.9923,
                    "end_lat": 41.874,
                    "end_long": -102.9923,
                    "rider_name": "Morty",
                    "driver_name": "Rick",
                    "driver_vehicle": "DeLorean DMC-12"
                })
                .expect(200, done);
        });
    });

    describe('GET /rides', () => {
        it('should return rides', (done) => {
            request(routes)
                .get('/rides?page=0&page_size=5')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect((res) => {
                    const expectedValues = {
                        "startLat": 41.874,
                        "startLong": -102.9923,
                        "endLat": 41.874,
                        "endLong": -102.9923,
                        "riderName": "Morty",
                        "driverName": "Rick",
                        "driverVehicle": "DeLorean DMC-12",
                    };
                    Object.keys(expectedValues).forEach((key) => {
                        assert.strictEqual(res.body[0][key], expectedValues[key]);
                    });
                })
                .then((res) => {
                    rideID = res.body[0].rideID;
                    done();
                }).catch((error) => done(error));
        });
        it('should fail with invalid pagination', (done) => {
            request(routes)
                .get('/rides?page=hack&page_size="1 = 1')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect({
                    error_code: 'VALIDATION_ERROR',
                    message: 'page must be an integer'
                }, done);
        });
        it('should return empty response for too large page number', (done) => {
            request(routes)
                .get('/rides?page=999&page_size=5')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect({
                    error_code: 'RIDES_NOT_FOUND_ERROR',
                    message: 'Could not find any rides'
                }, done);
        });
    });

    describe(`GET /rides/{id}`, () => {
        it('should return single ride', (done) => {
            request(routes)
                .get(`/rides/${rideID}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .expect((res) => {
                    const expectedValues = {
                        "startLat": 41.874,
                        "startLong": -102.9923,
                        "endLat": 41.874,
                        "endLong": -102.9923,
                        "riderName": "Morty",
                        "driverName": "Rick",
                        "driverVehicle": "DeLorean DMC-12",
                    };
                    Object.keys(expectedValues).forEach((key) => {
                        assert.strictEqual(res.body[0][key], expectedValues[key]);
                    });
                }).end(done);
        });
        it('should return error for fake rideID', (done) => {
            request(routes)
                .get(`/rides/999`)
                .expect('Content-Type', /json/)
                .expect(200)
                .expect({
                    error_code: 'RIDES_NOT_FOUND_ERROR',
                    message: 'Could not find any rides'
                }, done);
        });
        it('should return error for invalid rideID', (done) => {
            request(routes)
                .get(`/rides/rideid`)
                .expect('Content-Type', /json/)
                .expect(200)
                .expect({
                    error_code: 'VALIDATION_ERROR',
                    message: 'id must be an integer'
                }, done);
        });
    });

    describe(`SQL Injection tests`, () => {
        it('POST /rides', (done) => {
            request(routes)
                .post('/rides')
                .send({
                    "start_lat": 41.874,
                    "start_long": -102.9923,
                    "end_lat": 41.874,
                    "end_long": -102.9923,
                    "rider_name": "'Morty' OR 42=42",
                    "driver_name": "Rick' OR 42=42",
                    "driver_vehicle": "\\'DeLorean\' OR 'DMC-12' = 'DMC-12'"
                })
                .expect(200)
                .expect((res) => {
                    const expectedValues = {
                        "startLat": 41.874,
                        "startLong": -102.9923,
                        "endLat": 41.874,
                        "endLong": -102.9923,
                        "riderName": "'Morty' OR 42=42",
                        "driverName": "Rick' OR 42=42",
                        "driverVehicle": "\\'DeLorean\' OR 'DMC-12' = 'DMC-12'",
                    };
                    Object.keys(expectedValues).forEach((key) => {
                        assert.strictEqual(res.body[0][key], expectedValues[key]);
                    });
                }).end(done);
        });
        it('GET /rides', (done) => {
            request(routes)
                .get(`/rides?page=0&page_size=10 union select 1 = 1 --`)
                .expect('Content-Type', /json/)
                .expect(200)
                .expect({
                    error_code: 'VALIDATION_ERROR',
                    message: 'page size must be an integer'
                }, done);
        });
    });

});
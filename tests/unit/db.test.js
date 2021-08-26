/* eslint-disable no-undef */
const assert = require('assert');
const db = require('../../src/db');
const sinon = require('sinon');

describe('DB tests', () => {
    before((done) => {
        db.init().then(done);
    });

    describe('DB run method', () => {
        after(() => {
            sinon.restore();
        });
        it('should not throw', async () => {
            await db.run('SELECT 1', []);
        });
        it('should fail', async () => {
            const stub = sinon.stub(db.getInstance(), 'run');
            stub.callsFake(function(query, params, cb) { cb('Error'); });
            try {
                await db.run('SELECT 1', []);
                assert.fail('should not be here');
            } catch(error) {
                assert.strictEqual(error, 'Error');
            }
        });

    });

    describe('DB all method', () => {
        after(() => {
            sinon.restore();
        });
        it('should return data', async () => {
            const data = await db.all('SELECT 1', []);
            assert.strictEqual(data[0]['1'], 1);
        });
        it('should fail', async () => {
            const stub = sinon.stub(db.getInstance(), 'all');
            stub.callsFake(function(query, params, cb) { cb('Error'); });
            try {
                await db.all('SELECT 1', []);
                assert.fail('should not be here');
            } catch(error) {
                assert.strictEqual(error, 'Error');
            }
        });

    });

});
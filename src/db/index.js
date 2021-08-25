const sqlite3 = require('sqlite3').verbose();
const buildSchema = require('./schema');

// Module private variable for DB instance
let dbInstance = null;

/**
 * Get new or existing instance of DB
 * @return {sqlire3.Database}
 */
const getInstance = () => {
    if (dbInstance === null) {
        // db = new sqlite3.Database('./db.sql');
        dbInstance = new sqlite3.Database(':memory:');
    }
    return dbInstance;
};

/**
 * Initialize DB schemas
 */
const init = async () => {
    await buildSchema(getInstance());
};

/**
 * Promisified version of SQLite3 `all` method
 * @param {String} query 
 * @param {Array} params 
 * @returns {Promise}
 */
const all = (query, params) => {
    return new Promise((resolve, reject) => {
        getInstance().all(query, params, (error, result) => {
            if(error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
};

/**
 * Promisified version of SQLite3 `run` method
 * @param {String} query 
 * @param {Array} params 
 * @returns {Promise}
 */
const run = (query, params) => {
    return new Promise((resolve, reject) => {
        getInstance().run(query, params, function (error) {
            if(error) {
                return reject(error);
            }
            return resolve(this);
        });
    });
};

/**
 * Insert provided values into table
 * @param {String} table Table name
 * @param {Object} obj Payload with keys as fields and values to insert
 * @returns {Number} ID of inserted item
 */
const insert = async (table, obj) => {
    const keys = Object.keys(obj).join(',');
    const values = Object.values(obj);
    const valuesQuery = Array(Object.keys(obj).length).fill('?').join(',');
    const result = await run(`INSERT INTO ${table}(${keys}) VALUES (${valuesQuery})`, values);
    return result.lastID;
};

module.exports = {
    all,
    run,
    init,
    insert,
    getInstance,
};

const sqlite3 = require('sqlite3').verbose();
const buildSchema = require('./schema');

let db = null;

const getInstance = () => {
    if (db === null) {
        // db = new sqlite3.Database('./db.sql');
        db = new sqlite3.Database(':memory:');
    }
    return db;
};


const init = async () => {
    await buildSchema(getInstance());
};

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
};

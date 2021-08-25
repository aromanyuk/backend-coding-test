const db = require('./index');
const TABLE = 'Rides';

/**
 * Insert Ride into DB
 * @param {Object} payload 
 * @returns {Array<Object>} inserted rows
 */
const create = async (payload) => {
    const id = await db.insert(TABLE, payload);
    const rows = await getByID(id);
    return rows;
};

/**
 * Get Ride by its ID
 * @param {Number} id 
 * @returns {Array<Object>}
 */
const getByID = async (id) => {
    const rows = await db.all(`SELECT * FROM ${TABLE} WHERE rideID=?`, [id]);
    return rows;
};

/**
 * Get Rides
 * @param {Number} page
 * @param {Number} pageSize
 * @returns {Array<Object>}
 */
const get = async ({ page, pageSize }) => {
    const rows = await db.all(`SELECT * FROM ${TABLE} LIMIT ? OFFSET ?`, [pageSize, page * pageSize]);
    return rows;
};

module.exports = {
    create,
    get,
    getByID,
};

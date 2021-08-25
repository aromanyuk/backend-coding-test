const db = require('./index');
const TABLE = 'Rides';

const create = async (payload) => {
    const id = await db.insert(TABLE, payload);
    const rows = await getByID(id);
    return rows;
};

const getByID = async (id) => {
    const rows = await db.all(`SELECT * FROM ${TABLE} WHERE rideID=?`, [id]);
    return rows;
}

const get = async ({ page, pageSize }) => {
    const rows = await db.all(`SELECT * FROM ${TABLE} LIMIT ? OFFSET ?`, [pageSize, page * pageSize]);
    return rows;
}

module.exports = {
    create,
    get,
    getByID,
};

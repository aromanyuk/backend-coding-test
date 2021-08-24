const info = require('./info');
const servers = require('./servers');
const components = require('./components');
const routes = require('./routes');

const docs = {
    ...info,
    ...servers,
    ...components,
    ...routes,
};

module.exports = docs;

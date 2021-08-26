const winston = require('winston');

const transports = [
  new winston.transports.Console({
      format: winston.format.simple(),
  }),
];

// eslint-disable-next-line no-undef
if(process.env.NODE_ENV === 'production') {
  transports.push(new winston.transports.File({ filename: './logs/server.log' }));
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports,
});

module.exports = logger;

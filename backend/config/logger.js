const winston = require('winston');
require('winston-daily-rotate-file');
require('winston-mongodb');
//logger 
const fileTransport = new winston.transports.DailyRotateFile({
    filename: 'CMS-api-logs-%DATE%.log',
    datePattern: 'DD-MM-YYYY'
  });
const dbTransport = new winston.transports.MongoDB({
    level: 'error',
    db:`mongodb+srv://rothi:${process.env.MONGODB_PASS}@cluster0.xt4sj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    collection: 'log'
})
const logger = winston.createLogger({
    transports: [
      fileTransport,
      dbTransport
    ]
  });
  module.exports = logger
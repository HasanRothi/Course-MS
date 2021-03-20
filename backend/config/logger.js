const winston = require('winston');
require('winston-daily-rotate-file');
require('winston-mongodb');
//logger 
const fileTransport = new winston.transports.DailyRotateFile({
    filename: './log/CMS-api-logs-%DATE%.log',
    datePattern: 'DD-MM-YYYY'
  });
const dbTransport = new winston.transports.MongoDB({
    level: 'info',
    db:`mongodb+srv://rothi:${process.env.MONGODB_PASS}@cluster0.xt4sj.mongodb.net/${process.env.LOGGER_DB_NAME}?retryWrites=true&w=majority`,
    collection: 'log'
})
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    // winston.format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
    winston.format.printf(info => `${info.message}`)
  ),
    transports: [
      fileTransport,
      dbTransport
    ]
  });
  module.exports = logger
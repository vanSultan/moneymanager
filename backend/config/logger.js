const { createLogger, format, transports } = require('winston');
const morganLogger = require('morgan');
const fs = require('fs');

const { combine, timestamp, simple } = format;

const sqlLogger = createLogger({
  transports: [new transports.File({
    filename: './logs/sql_requests.log',
    level: 'debug',
    format: combine(
      timestamp(),
      simple(),
    ),
  })],
});

const appLogger = createLogger({
  transports: [
    new transports.File({
      filename: './logs/app.log',
      level: 'info',
      format: combine(
        timestamp(),
        simple(),
      ),
    }),
    new transports.Console({
      level: 'info',
      format: simple(),
    }),
  ],
});

const accessLoggerConsole = morganLogger('dev');

const accessLoggerFile = morganLogger('combined', {
  stream: fs.createWriteStream('./logs/access.log', { flags: 'a' }),
});

module.exports = {
  sqlLogger,
  appLogger,
  accessLoggerConsole,
  accessLoggerFile,
};

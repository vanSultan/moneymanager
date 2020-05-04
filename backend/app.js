const express = require('express');
const { app: appConfig } = require('./config/config');
const { db } = require('./models');
const initDatabase = require('./models/init_database');
const { appLogger, accessLoggerConsole, accessLoggerFile } = require('./config/logger');

process.env.NODE_CONFIG_DIR = './config';

const app = express();
if (process.env.NODE_ENV !== 'prod') {
  app.use(accessLoggerConsole);
}
if (process.env.NODE_ENV !== 'test') {
  app.use(accessLoggerFile);
}
app.use(express.json());

require('./routes')(app);

const PORT = appConfig.port;

async function start() {
  try {
    await db.sequelize.sync();
    initDatabase(db.models);
    app.listen(PORT, () => appLogger.info(`App has been started on port ${PORT}...`));
  } catch (e) {
    appLogger.error(`Server Error: ${e.message}`);
    process.exit(1);
  }
}

start().then(() => {});

module.exports = app;

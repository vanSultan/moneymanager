const {Sequelize} = require('sequelize');
const {database: dbConfig} = require('../config/config');

const sequelize = new Sequelize(dbConfig);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Role = require('./role')(sequelize, Sequelize);
db.UserProfile = require('./user_profile')(sequelize, Sequelize);

module.exports = db;

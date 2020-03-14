const Sequelize = require('sequelize');
const {database: dbConfig} = require('../config/config');

let sequelize;

if (dbConfig.url) {
    sequelize = new Sequelize(dbConfig.url, dbConfig);
} else {
    sequelize = new Sequelize(dbConfig)
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Role = require('./role')(sequelize, Sequelize);
db.UserProfile = require('./user_profile')(sequelize, Sequelize);

module.exports = db;

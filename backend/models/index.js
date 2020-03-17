const {Sequelize} = require('sequelize');
const {database: dbConfig} = require('../config/config');

const sequelize = new Sequelize(dbConfig);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user/user')(sequelize, Sequelize);
db.Role = require('./user/role')(sequelize, Sequelize);
db.UserProfile = require('./user/user_profile')(sequelize, Sequelize);

// db.Role.hasMany(db.User, { foreignKey: {name: 'role_id', allowNull: false}, onDelete: 'restrict' });
// db.User.belongsTo(db.Role, { foreignKey: {name: 'role_id', allowNull: false}, onDelete: 'restrict' });

module.exports = db;

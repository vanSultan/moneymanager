const { Sequelize } = require('sequelize');
const { database: dbConfig } = require('../config/config');

const sequelize = new Sequelize(dbConfig);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const models = {};

// User
models.User = require('./user/user')(sequelize, Sequelize);
models.Role = require('./user/role')(sequelize, Sequelize);
models.UserProfile = require('./user/user_profile')(sequelize, Sequelize);

// Account
models.Account = require('./account/account')(sequelize, Sequelize);
models.AccountType = require('./account/account_type')(sequelize, Sequelize);

// Category
models.Category = require('./category/category')(sequelize, Sequelize);
models.CategoryUser = require('./category/category_user')(sequelize, Sequelize);

// ExternalEntity
models.ExternalEntity = require('./external_entity/external_entity')(sequelize, Sequelize);
models.ExternalEntityUser = require('./external_entity/external_entity_user')(sequelize, Sequelize);

// Operation
models.Operation = require('./operation/operation')(sequelize, Sequelize);

Object.keys(models).forEach((model) => {
  models[model].associate(models);
});

db.models = models;

module.exports = { db, models };

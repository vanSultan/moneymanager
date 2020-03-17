const {Sequelize} = require('sequelize');
const {database: dbConfig} = require('../config/config');

const sequelize = new Sequelize(dbConfig);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const models = {};

// User
models.User = require('./user/user')(sequelize, Sequelize);
models.Role = require('./user/role')(sequelize, Sequelize);
models.UserProfile = require('./user/user_profile')(sequelize, Sequelize);

models.Role.hasMany(models.User, {foreignKey: {name: 'role_id', allowNull: false}, onDelete: 'restrict'});
models.User.belongsTo(models.Role, {foreignKey: {name: 'role_id', allowNull: false}, onDelete: 'restrict'});

models.User.hasOne(models.UserProfile, {foreignKey: 'user_id'});
models.UserProfile.belongsTo(models.User, {foreignKey: 'user_id'});

// Account
models.Account = require('./account/account')(sequelize, Sequelize);
models.AccountType = require('./account/account_type')(sequelize, Sequelize);

models.AccountType.hasMany(models.Account, {foreignKey: 'type_id', onDelete: 'restrict'});
models.Account.belongsTo(models.AccountType, {foreignKey: 'type_id', onDelete: 'restrict'});

models.User.hasMany(models.Account, {foreignKey: 'user_id'});
models.Account.belongsTo(models.User, {foreignKey: 'user_id'});

// Category
models.Category = require('./category/category')(sequelize, Sequelize);
models.CategoryUser = require('./category/category_user')(sequelize, Sequelize);

models.Category.hasMany(models.Category, {foreignKey: 'parent_category_id', onDelete: 'restrict'});
models.Category.belongsTo(models.Category, {foreignKey: 'parent_category_id', onDelete: 'restrict'});

models.User.belongsToMany(models.Category, {foreignKey: 'user_id', through: 'category_user'});
models.Category.belongsToMany(models.User, {foreignKey: 'category_id', through: 'category_user', onDelete: 'restrict'});

// ExternalEntity
models.ExternalEntity = require('./external_entity/external_entity')(sequelize, Sequelize);
models.ExternalEntityUser = require('./external_entity/external_entity_user')(sequelize, Sequelize);

models.Category.hasMany(models.ExternalEntityUser, {foreignKey: 'popular_category_id', onDelete: 'set null'});
models.ExternalEntityUser.belongsTo(models.Category, {foreignKey: 'popular_category_id', onDelete: 'set null'});

models.User.belongsToMany(models.ExternalEntity, {foreignKey: 'user_id', through: 'external_entity_user'});
models.ExternalEntity.belongsToMany(models.User, {foreignKey: 'external_entity_id', through: 'external_entity_user', onDelete: 'restrict'});

// Operation
models.Operation = require('./operation/operation')(sequelize, Sequelize);

models.User.hasMany(models.Operation, {foreignKey: 'user_id'});
models.Operation.belongsTo(models.User, {foreignKey: 'user_id'});

models.Account.hasMany(models.Operation, {foreignKey: 'account_from_id', onDelete: 'restrict'});
models.Operation.belongsTo(models.Account, {foreignKey: 'account_from_id', onDelete: 'restrict'});

models.Account.hasMany(models.Operation, {foreignKey: 'account_to_id', onDelete: 'restrict'});
models.Operation.belongsTo(models.Account, {foreignKey: 'account_to_id', onDelete: 'restrict'});

models.Category.hasMany(models.Operation, {foreignKey: 'category_id', onDelete: 'restrict'});
models.Operation.belongsTo(models.Category, {foreignKey: 'category_id', onDelete: 'restrict'});

models.ExternalEntity.hasMany(models.Operation, {foreignKey: 'external_entity_id', onDelete: 'set null'});
models.Operation.belongsTo(models.ExternalEntity, {foreignKey: 'external_entity_id', onDelete: 'set null'});

db.models = models;

module.exports = { db, models };

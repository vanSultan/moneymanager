/**
 * Модуль пользователя
 * @module models/user
 */
module.exports = (sequelize, DataTypes) => {
  /**
   * @type {Model}
   * @property {number} id
   * @property {string} login
   * @property {string} password
   * @property {boolean} freezeTableName
   */
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'id',
      autoIncrement: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'login',
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password',
    },
  }, {
    freezeTableName: true,
  });

  User.associate = (models) => {
    User.belongsTo(models.Role, { foreignKey: { name: 'role_id', allowNull: false }, onDelete: 'restrict' });
    User.hasOne(models.UserProfile, { foreignKey: 'user_id' });
    User.hasMany(models.Account, { foreignKey: 'user_id' });
    User.hasMany(models.Operation, { foreignKey: 'user_id' });

    User.belongsToMany(models.Category, { foreignKey: 'user_id', through: 'category_user' });
    User.hasMany(models.CategoryUser, { foreignKey: 'user_id' });
    User.belongsToMany(models.ExternalEntity, { foreignKey: 'user_id', through: 'external_entity_user' });
    User.hasMany(models.ExternalEntityUser, { foreignKey: 'user_id' });
  };

  return User;
};

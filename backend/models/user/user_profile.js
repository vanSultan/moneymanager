/**
 * Модуль профиля пользователя
 * @module models/user
 */
module.exports = (sequelize, DataTypes) => {
  /**
   * @type {Model}
   * @property {number} user_id - id пользователя
   * @property {string} email - почтовый адрес пользователя
   * @property {string} name - имя пользователя
   * @property {string} surname - фамилия пользователя
   * @property {boolean} freezeTableName - фиксорованное имя
   */
  const UserProfile = sequelize.define('user_profile', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'user_id',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'email',
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name',
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'surname',
    },
  }, {
    freezeTableName: true,
  });

  UserProfile.associate = (models) => {
    UserProfile.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return UserProfile;
};

/**
 * Модуль Типа аккаунта
 * @module models/account_types
 */

/** Все данные о типе аккаунта */
module.exports = (sequelize, DataTypes) => {
  /**
   * @type {Model}
   * @property {number} id
   * @property {string} type_name
   * @property {boolean} freezeTableName
   */
  const AccountType = sequelize.define('account_type', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'id',
      autoIncrement: true,
    },
    type_name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'type_name',
      unique: true,
    },
  }, {
    freezeTableName: true,
  });

  AccountType.associate = (models) => {
    AccountType.hasMany(models.Account, { foreignKey: 'type_id', onDelete: 'restrict' });
  };

  return AccountType;
};

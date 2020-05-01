/**
 * Модуль операций
 * @module models/operation
 */
const { database: dbConfig } = require('../../config/config');

module.exports = (sequelize, DataTypes) => {
  /**
   * @type {Model}
   * @property {number} id
   * @property {number} user_id
   * @property {number} account_from_id
   * @property {number} account_to_id
   * @property {number} category_id
   * @property {number} external_entity_id
   * @property {number} value
   * @property {string} comment
   * @property {date} created_at
   * @property {date} updated_at
   * @property {boolean} freezeTableName
   */
  const Operation = sequelize.define('operation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'id',
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
    },
    account_from_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      field: 'account_from_id',
    },
    account_to_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      field: 'account_to_id',
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'category_id',
    },
    external_entity_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      field: 'external_entity_id',
    },
    value: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '0',
      field: 'value',
    },
    comment: {
      type: DataTypes.STRING,
      defaultValue: null,
      field: 'comment',
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal(dbConfig.timestamp_now_function),
      field: 'system_date',
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal(dbConfig.timestamp_now_function),
      field: 'updated_at',
    },
  }, {
    freezeTableName: true,
  });

  Operation.associate = (models) => {
    Operation.belongsTo(models.User, { foreignKey: 'user_id' });
    Operation.belongsTo(models.Account, { foreignKey: 'account_from_id', onDelete: 'restrict' });
    Operation.belongsTo(models.Account, { foreignKey: 'account_to_id', onDelete: 'restrict' });
    Operation.belongsTo(models.Category, { foreignKey: 'category_id', onDelete: 'restrict' });
    Operation.belongsTo(models.ExternalEntity, { foreignKey: 'external_entity_id', onDelete: 'set null' });
  };

  return Operation;
};

/**
 * Модуль операций
 * @module models/operation
 */
const { database: dbConfig } = require('../../config/config');

module.exports = (sequelize, DataTypes) => {
  /**
   * @type {Model}
   * @property {number} id - индентификатор
   * @property {number} user_id - id пользователя
   * @property {number} account_from_id - id отправителя
   * @property {number} account_to_id - id получателя
   * @property {number} category_id - id категории
   * @property {number} external_entity_id - id расширенной категории
   * @property {number} value - сумма
   * @property {string} comment - комментарий
   * @property {date} created_at - дата перевода
   * @property {date} updated_at - дата обновления
   * @property {boolean} freezeTableName - фиксорованное имя
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

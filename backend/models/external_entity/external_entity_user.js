/**
 * Модуль Сущностей пользователя
 * @module models/external_entity
 */
module.exports = (sequelize, DataTypes) => {
  /**
   * @type {Model}
   * @property {number} user_id - id пользователя
   * @property {number} external_entity_id - id категории
   * @property {number} popular_category_id - id популярной категории
   * @property {boolean} freezeTableName - фиксорованное имя
   */
  const ExternalEntityUser = sequelize.define('external_entity_user', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'user_id',
    },
    external_entity_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'external_entity_id',
    },
    popular_category_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      field: 'popular_category_id',
    },
  }, {
    freezeTableName: true,
  });

  ExternalEntityUser.associate = (models) => {
    ExternalEntityUser.belongsTo(models.Category, { foreignKey: 'popular_category_id', onDelete: 'set null' });
  };

  return ExternalEntityUser;
};

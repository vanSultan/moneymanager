/**
 * Модуль Категории пользователя
 * @module models/category
 */
module.exports = (sequelize, DataTypes) => {
  /**
   * @type {Model}
   * @property {number} user_id - id пользователя
   * @property {number} category_id - id категории
   * @property {boolean} hidden_flag - видимость категории
   * @property {boolean} freezeTableName - фиксорованное имя
   */
  const CategoryUser = sequelize.define('category_user', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'user_id',
    },
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'category_id',
    },
    hidden_flag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'hidden_flag',
    },
  }, {
    freezeTableName: true,
  });

  CategoryUser.associate = (models) => {
    CategoryUser.belongsTo(models.User, { targetKey: 'id', foreignKey: 'user_id' });
    CategoryUser.belongsTo(models.Category, { targetKey: 'id', foreignKey: 'category_id' });
  };

  return CategoryUser;
};

/**
 * Модуль Категории
 * @module models/category
 */
module.exports = (sequelize, DataTypes) => {
  /**
   * @type {Model}
   * @property {number} id - идентификатор
   * @property {string} name - имя категории
   * @property {number} parent_category_id - id родительской категории
   * @property {boolean} freezeTableName - фиксорованное имя
   */
  const Category = sequelize.define('category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'id',
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name',
      unique: true,
    },
    parent_category_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      field: 'parent_category_id',
    },
  }, {
    freezeTableName: true,
  });

  Category.associate = (models) => {
    Category.hasMany(models.Category, { foreignKey: 'parent_category_id', onDelete: 'restrict' });
    Category.belongsTo(models.Category, { foreignKey: 'parent_category_id', onDelete: 'restrict' });

    Category.hasMany(models.ExternalEntityUser, { foreignKey: 'popular_category_id', onDelete: 'set null' });
    Category.hasMany(models.Operation, { foreignKey: 'category_id', onDelete: 'restrict' });

    Category.belongsToMany(models.User, { foreignKey: 'category_id', through: 'category_user', onDelete: 'restrict' });
    Category.hasMany(models.CategoryUser, { foreignKey: 'category_id' });
  };

  return Category;
};

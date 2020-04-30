module.exports = (sequelize, DataTypes) => {
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

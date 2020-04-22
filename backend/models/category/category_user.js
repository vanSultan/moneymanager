module.exports = (sequelize, DataTypes) => {
  const attributes = {
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
  };

  const options = {
    freezeTableName: true,
  };

  return sequelize.define('category_user', attributes, options);
};

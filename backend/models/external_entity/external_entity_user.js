module.exports = (sequelize, DataTypes) => {
  const attributes = {
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
  };

  const options = {
    freezeTableName: true,
  };

  return sequelize.define('external_entity_user', attributes, options);
};

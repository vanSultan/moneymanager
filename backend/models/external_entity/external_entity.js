module.exports = (sequelize, DataTypes) => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'id',
      autoIncrement: true,
    },
    name: {
      type: DataTypes.CHAR,
      allowNull: false,
      field: 'name',
      unique: true,
    },
  };

  const options = {
    freezeTableName: true,
  };

  return sequelize.define('external_entity', attributes, options);
};

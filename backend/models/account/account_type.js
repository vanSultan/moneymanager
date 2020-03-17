module.exports = (sequelize, DataTypes) => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'id',
      autoIncrement: true,
    },
    type_name: {
      type: DataTypes.CHAR,
      allowNull: false,
      field: 'type_name',
      unique: true,
    },
  };

  const options = {
    freezeTableName: true,
  };

  return sequelize.define('account_type', attributes, options);
};

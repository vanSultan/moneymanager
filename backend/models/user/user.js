module.exports = (sequelize, DataTypes) => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'id',
      autoIncrement: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'login',
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password',
    },
  };

  const options = {
    freezeTableName: true,
  };

  return sequelize.define('user', attributes, options);
};

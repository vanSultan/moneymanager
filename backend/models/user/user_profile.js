module.exports = (sequelize, DataTypes) => {
  const attributes = {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'user_id',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'email',
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name',
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'surname',
    },
  };

  const options = {
    freezeTableName: true,
  };

  return sequelize.define('user_profile', attributes, options);
};

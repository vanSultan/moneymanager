module.exports = (sequelize, DataTypes) => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'id',
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
    },
    name: {
      type: DataTypes.CHAR,
      allowNull: false,
      field: 'name',
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'type_id',
    },
    balance: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '0',
      field: 'balance',
    },
  };

  const options = {
    freezeTableName: true,
    indexes: [{
      name: 'account_user_id_name_uindex',
      unique: true,
      fields: ['user_id', 'name'],
    }],
  };

  return sequelize.define('account', attributes, options);
};

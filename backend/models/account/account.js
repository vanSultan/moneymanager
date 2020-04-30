module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('account', {
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
      type: DataTypes.STRING,
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
  }, {
    freezeTableName: true,
    indexes: [{
      name: 'account_user_id_name_uindex',
      unique: true,
      fields: ['user_id', 'name'],
    }],
  });

  Account.associate = (models) => {
    Account.belongsTo(models.AccountType, { foreignKey: 'type_id', onDelete: 'restrict' });
    Account.belongsTo(models.User, { foreignKey: 'user_id' });
    Account.hasMany(models.Operation, { foreignKey: 'account_from_id', onDelete: 'restrict' });
    Account.hasMany(models.Operation, { foreignKey: 'account_to_id', onDelete: 'restrict' });
  };

  return Account;
};

const { database: dbConfig } = require('../../config/config');

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
    account_from_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      field: 'account_from_id',
    },
    account_to_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      field: 'account_to_id',
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'category_id',
    },
    external_entity_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      field: 'external_entity_id',
    },
    value: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '0',
      field: 'value',
    },
    comment: {
      type: DataTypes.STRING,
      defaultValue: null,
      field: 'comment',
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal(dbConfig.timestamp_now_function),
      field: 'system_date',
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal(dbConfig.timestamp_now_function),
      field: 'updated_at',
    },
  };

  const options = {
    freezeTableName: true,
  };

  return sequelize.define('operation', attributes, options);
};

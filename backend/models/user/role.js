module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('role', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'id',
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name',
      unique: true,
    },
  }, {
    freezeTableName: true,
  });

  Role.associate = (models) => {
    Role.hasMany(models.User, { foreignKey: { name: 'role_id', allowNull: false }, onDelete: 'restrict' });
  };

  return Role;
};

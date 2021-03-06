/**
 * Модуль Сущностей
 * @module models/external_entity
 */
module.exports = (sequelize, DataTypes) => {
  /**
   * @type {Model}
   * @property {number} id - индентификатор
   * @property {string} name - имя сущности
   * @property {boolean} freezeTableName - фиксорованное имя
   */
  const ExternalEntity = sequelize.define('external_entity', {
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

  ExternalEntity.associate = (models) => {
    ExternalEntity.hasMany(models.Operation, { foreignKey: 'external_entity_id', onDelete: 'set null' });

    ExternalEntity.belongsToMany(models.User, { foreignKey: 'external_entity_id', through: 'external_entity_user', onDelete: 'restrict' });
    ExternalEntity.hasMany(models.ExternalEntityUser, { foreignKey: 'external_entity_id' });
  };

  return ExternalEntity;
};

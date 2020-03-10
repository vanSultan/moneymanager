const {
    DataTypes
} = require('sequelize');

module.exports = sequelize => {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: "id",
            autoIncrement: true
        },
        name: {
            type: DataTypes.CHAR,
            allowNull: false,
            primaryKey: false,
            field: "name",
            unique: "external_entity_name_uindex"
        }
    };

    const options = {
        tableName: "external_entity"
    };

    return sequelize.define("external_entity_model", attributes, options);
};
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
            field: "name",
            unique: "user_role_name_uindex"
        }
    };

    const options = {
        tableName: "role"
    };

    return sequelize.define("role_model", attributes, options);
};
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
        type_name: {
            type: DataTypes.CHAR,
            allowNull: false,
            primaryKey: false,
            field: "type_name",
            unique: "account_type_type_name_uindex"
        }
    };

    const options = {
        tableName: "account_type"
    };

    return sequelize.define("account_type_model", attributes, options);
};
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
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "user_id",
            references: {
                key: "id",
                model: "user_model"
            }
        },
        name: {
            type: DataTypes.CHAR,
            allowNull: false,
            field: "name"
        },
        type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "type_id",
            references: {
                key: "id",
                model: "account_type_model"
            }
        },
        balance: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: "0",
            field: "balance"
        }
    };

    const options = {
        tableName: "account",
        indexes: [{
            name: "account_user_id_name_uindex",
            unique: true,
            fields: ["user_id", "name"]
        }]
    };

    return sequelize.define("account_model", attributes, options);
};
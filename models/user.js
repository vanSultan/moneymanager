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
        login: {
            type: DataTypes.CHAR,
            allowNull: false,
            field: "login",
            unique: "user_login_uindex"
        },
        password: {
            type: DataTypes.CHAR,
            allowNull: false,
            field: "password"
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "role_id",
            references: {
                key: "id",
                model: "role_model"
            }
        }
    };

    const options = {
        tableName: "user"
    };

    return sequelize.define("user_model", attributes, options);
};
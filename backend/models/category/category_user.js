const {
    DataTypes
} = require('sequelize');

module.exports = sequelize => {
    const attributes = {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: "user_id",
            references: {
                key: "id",
                model: "user_model"
            }
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: "category_id",
            references: {
                key: "id",
                model: "category_model"
            }
        },
        hidden_flag: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: "hidden_flag"
        }
    };

    const options = {
        tableName: "category_user"
    };

    return sequelize.define("category_user_model", attributes, options);
};
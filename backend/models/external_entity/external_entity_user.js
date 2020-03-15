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
        external_entity_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: "external_entity_id",
            references: {
                key: "id",
                model: "external_entity_model"
            }
        },
        popular_category_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: "popular_category_id",
            references: {
                key: "id",
                model: "category_model"
            }
        }
    };

    const options = {
        tableName: "external_entity_user"
    };

    return sequelize.define("external_entity_user_model", attributes, options);
};
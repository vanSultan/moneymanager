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
        account_from_id: {
            type: DataTypes.INTEGER,
            defaultValue: null,
            field: "account_from_id",
            references: {
                key: "id",
                model: "account_model"
            }
        },
        account_to_id: {
            type: DataTypes.INTEGER,
            defaultValue: null,
            field: "account_to_id",
            references: {
                key: "id",
                model: "account_model"
            }
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "category_id",
            references: {
                key: "id",
                model: "category_model"
            }
        },
        external_entity_id: {
            type: DataTypes.INTEGER,
            defaultValue: null,
            field: "external_entity_id",
            references: {
                key: "id",
                model: "external_entity_model"
            }
        },
        value: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: "0",
            field: "value"
        },
        comment: {
            type: DataTypes.CHAR,
            defaultValue: null,
            field: "comment"
        },
        system_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('now'),
            field: "system_date"
        },
        user_dat: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('now'),
            field: "user_date"
        }
    };

    const options = {
        tableName: "operation"
    };

    return sequelize.define("operation_model", attributes, options);
};
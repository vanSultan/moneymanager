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
            unique: "category_name_uindex"
        },
        parent_category_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
            field: "parent_category_id",
            references: {
                key: "id",
                model: "category_model"
            }
        }
    };

    const options = {
        tableName: "category"
    };

    return sequelize.define("category_model", attributes, options);
};
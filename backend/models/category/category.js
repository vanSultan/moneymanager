module.exports = (sequelize, DataTypes) => {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: "id",
            autoIncrement: true
        },
        name: {
            type: DataTypes.CHAR,
            allowNull: false,
            field: "name",
            unique: true
        },
        parent_category_id: {
            type: DataTypes.INTEGER,
            defaultValue: null,
            field: "parent_category_id"
        }
    };

    const options = {
        freezeTableName: true
    };

    return sequelize.define("category", attributes, options);
};
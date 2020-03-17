module.exports = (sequelize, DataTypes) => {
    const attributes = {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: "user_id"
        },
        email: {
            type: DataTypes.CHAR,
            allowNull: false,
            field: "email",
            unique: true
        },
        name: {
            type: DataTypes.CHAR,
            allowNull: false,
            field: "name"
        },
        surname: {
            type: DataTypes.CHAR,
            allowNull: false,
            field: "surname"
        }
    };

    const options = {
        freezeTableName: true
    };

    return sequelize.define("user_profile", attributes, options);
};
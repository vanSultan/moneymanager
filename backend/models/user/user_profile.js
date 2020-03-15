module.exports = (sequelize, DataTypes) => {
    const attributes = {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: "user_id",
            references: {
                key: "id",
                model: "user"
            }
        },
        email: {
            type: DataTypes.CHAR,
            allowNull: false,
            field: "email",
            unique: "user_profile_email_uindex"
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
        tableName: "user_profile"
    };

    return sequelize.define("user_profile", attributes, options);
};
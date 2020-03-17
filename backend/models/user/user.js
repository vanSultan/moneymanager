module.exports = (sequelize, DataTypes) => {
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
        // role_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     field: "role_id",
        //     references: {
        //         model: 'role',
        //         key: 'id'
        //     }
        // }
    };

    const options = {
        freezeTableName: true
    };

    return sequelize.define("user", attributes, options);
};

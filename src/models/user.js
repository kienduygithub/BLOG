'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasOne(models.Post, { foreignKey: 'userId', as: 'userInfo' })
        }
    }
    User.init({
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        username: DataTypes.STRING,
        image: DataTypes.BLOB
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            Category.hasMany(models.Post, { foreignKey: 'categoryId', as: 'categoryData' })
        }
    }
    Category.init({
        keyMap: DataTypes.STRING,
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        count: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Category',
    });
    return Category;
};
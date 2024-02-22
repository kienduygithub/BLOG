'use strict'
const {
    Model
} = require('sequelize');
module.exports = (sequelize, Datatypes) => {
    class Post extends Model {
        static associate(models) {
            Post.belongsTo(models.User, { foreignKey: 'userId', as: 'userInfo' })
            // Post.belongsTo(models.Category, { foreignKey: 'categoryId', targetKey: 'keyMap', as: 'categoryInfo' })
            Post.belongsTo(models.Category, { foreignKey: 'categoryId', targetKey: 'keyMap', as: 'categoryData' })
        }
    }
    Post.init({
        title: Datatypes.STRING,
        description: Datatypes.TEXT,
        image: Datatypes.BLOB,
        userId: Datatypes.INTEGER,
        categoryId: Datatypes.STRING
    }, {
        sequelize,
        modelName: 'Post'
    });
    return Post;
}
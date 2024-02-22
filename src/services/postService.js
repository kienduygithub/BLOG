import { Op } from 'sequelize';
import db from '../models/index';

// POST SINGLE BLOG
const postSingleBlog = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { userId, title, description, image, categoryId } = data;
            const blog = await db.Post.create({
                userId: userId,
                title: title,
                description: description,
                image: image,
                categoryId: categoryId
            })
            const category = await db.Category.findOne({
                where: { keyMap: categoryId }
            })
            if (category) {
                category.count = category.count + 1;
                await category.save();
            } else {
                category.count = 1;
            }
            resolve({
                status: 'OK',
                message: 'Blog has been posted',
                data: blog
            })
        } catch (error) {
            reject(error);
        }
    })
}

// GET ALL POSTS
const getAllPosts = (category) => {
    return new Promise(async (resolve, reject) => {
        try {
            let posts = [];
            if (category) {
                const categoryFind = await db.Category.findOne({
                    where: { name: category },
                    logging: false
                })
                posts = await db.Post.findAll({
                    where: { categoryId: categoryFind.keyMap },
                    attributes: {
                        exclude: [ 'createdAt', 'updatedAt' ]
                    },
                    include: [
                        { model: db.Category, as: 'categoryData', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }
                    ],
                    nest: true,
                    raw: true
                })
            } else {
                posts = await db.Post.findAll({
                    attributes: {
                        exclude: [ 'createdAt', 'updatedAt' ]
                    },
                    include: [
                        { model: db.Category, as: 'categoryData', attributes: { exclude: [ 'createdAt', 'updatedAt' ] } }
                    ],
                    raw: true,
                    nest: true
                })
            }
            resolve({
                status: 'OK',
                message: 'GET ALL POSTS',
                data: posts ? posts : [],
            })
        } catch (error) {
            reject(error);
        }
    })
}

// GET SINGLE POST
const getSinglePost = (postId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const post = await db.Post.findOne({
                where: { id: postId },
                attributes: {
                    exclude: [ 'createdAt' ]
                },
                include: [
                    { model: db.User, as: 'userInfo' }
                ],
                raw: true,
                nest: true
            })
            if (!post) {
                resolve({
                    status: 'ERR',
                    message: 'Post not found!'
                })
            } else {
                resolve({
                    status: 'OK',
                    message: 'GET SINGLE POST!',
                    data: post
                })
            }
        } catch (error) {
            reject(error);
        }
    });
}

// DELETE SINGLE POST
const deleteSinglePost = (postId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const post = await db.Post.findOne({
                where: { id: postId }
            })
            if (!post) {
                resolve({
                    status: 'ERR',
                    message: 'Post not found!'
                })
            } else {
                const categoryId = post.categoryId;
                const category = await db.Category.findOne({
                    where: {
                        keyMap: categoryId,
                        count: {
                            [ Op.gt ]: 0
                        }
                    }
                })
                await post.destroy();
                category.count = category.count - 1;
                await category.save();
                resolve({
                    status: 'OK',
                    message: 'DELETE SINGLE POST',
                    category
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

// EDIT SINGLE POST
const putSinglePost = (postId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { userId, title, description, image, categoryId } = data;
            const post = await db.Post.findOne({
                where: { id: postId, userId: userId }
            })
            if (!post) {
                resolve({
                    status: 'ERR',
                    message: 'Post not found!'
                });
            } else {
                if (post.categoryId === categoryId) {
                    console.log('ccc')
                    post.title = title;
                    post.description = description;
                    post.image = image;
                    post.updatedAt = new Date();
                    await post.save();
                    resolve({
                        status: 'OK',
                        message: 'Post has been updated!'
                    })
                } else {
                    const oldCategory = await db.Category.findOne({
                        where: {
                            keyMap: post.categoryId,
                            count: { [ Op.gt ]: 0 }
                        }
                    })
                    if (oldCategory) {
                        post.title = title;
                        post.description = description;
                        post.categoryId = categoryId;
                        post.image = image;
                        post.updatedAt = new Date();
                        await post.save();

                        oldCategory.count = oldCategory.count - 1;
                        await oldCategory.save();
                        const latestCategory = await db.Category.findOne({
                            where: { keyMap: categoryId }
                        })
                        latestCategory.count = latestCategory.count + 1;
                        await latestCategory.save();
                        resolve({
                            status: 'OK',
                            message: 'Post has been updated!'
                        })
                    } else {
                        resolve({
                            status: 'ERR',
                            message: `Can't update the post, Plz try other post!`
                        })
                    }
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    postSingleBlog: postSingleBlog,
    getAllPosts: getAllPosts,
    getSinglePost: getSinglePost,
    deleteSinglePost: deleteSinglePost,
    putSinglePost: putSinglePost
}
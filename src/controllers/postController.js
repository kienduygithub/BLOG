import postService from '../services/postService';

// POST SINGLE BLOG
const postSingleBlog = async (req, res) => {
    try {
        const { title, description, categoryId } = req.body;
        if (!title || !description) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Blank info!'
            });
        }
        if (!categoryId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Select category!'
            })
        }
        const response = await postService.postSingleBlog(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

// GET ALL POSTS
const getAllPosts = async (req, res) => {
    try {
        const category = req.query.cat;
        const response = await postService.getAllPosts(category);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        });
    }
}

// GET SINGLE POST
const getSinglePost = async (req, res) => {
    try {
        const postId = req.query.id;
        if (!postId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Missing required parameter'
            });
        }
        const response = await postService.getSinglePost(postId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

// DELETE SINGLE POST
const deleteSinglePost = async (req, res) => {
    try {
        const postId = req.query.id;
        if (!postId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Missing required parameter'
            })
        }
        const response = await postService.deleteSinglePost(postId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

// EDIT SINGLE POST
const putSinglePost = async (req, res) => {
    try {
        const postId = req.body.id;
        if (!postId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Missing required parameter'
            })
        }
        const response = await postService.putSinglePost(postId, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

module.exports = {
    postSingleBlog: postSingleBlog,
    getAllPosts: getAllPosts,
    getSinglePost: getSinglePost,
    deleteSinglePost: deleteSinglePost,
    putSinglePost: putSinglePost
}
import express from 'express';
import postController from '../controllers/postController';
import { authMiddleWare } from '../controllers/jwtController';
const router = express.Router();

// POST SINGLE BLOG
router.post('/post-blog', postController.postSingleBlog)

// GET ALL POSTS
router.get('/get-all-posts', postController.getAllPosts)

// GET SINGLE POST
router.get('/get-single-post', postController.getSinglePost)

// DELETE SINGLE POST 
router.delete('/delete-single-post', authMiddleWare, postController.deleteSinglePost)

// EDIT SINGLE POST
router.put('/edit-single-post', authMiddleWare, postController.putSinglePost)

module.exports = router;
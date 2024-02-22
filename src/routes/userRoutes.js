import express from 'express';

import userController from '../controllers/userController';

const router = express.Router();

// GET USER DETAIL
router.get('/get-details', userController.getDetailsUser)

module.exports = router;
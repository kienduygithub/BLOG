import express from 'express';
import authController from '../controllers/authController';
import jwtController from '../controllers/jwtController';
const router = express.Router();

// REGISTER
router.post('/sign-up', authController.handleSignUp)

// LOGIN
router.post('/sign-in', authController.handleLogin)

// LOGOUT
router.get('/logout', authController.handleLogout)

// REFRESH TOKEN
router.get('/refresh_token', jwtController.handleRefreshToken)


module.exports = router;

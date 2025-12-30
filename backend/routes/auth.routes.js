const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Public routes
router.post('/signup', AuthController.signupValidation, AuthController.signup);
router.post('/login', AuthController.login);

// Protected routes
router.get('/me', authMiddleware, AuthController.getCurrentUser);
router.put('/profile', authMiddleware, AuthController.updateProfile);

module.exports = router;
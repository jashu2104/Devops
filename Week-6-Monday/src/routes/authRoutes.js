const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Public authentication APIs
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected API (Requires JWT token)
router.get('/profile', authenticateToken, authController.getProfile);

module.exports = router;

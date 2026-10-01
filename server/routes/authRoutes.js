const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

router.post('/admin/login', authController.adminLogin);
router.get('/admin/me', authenticateToken, authController.getMe);

module.exports = router;

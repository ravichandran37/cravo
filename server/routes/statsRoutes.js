const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');
const { authenticateToken } = require('../middleware/auth');

router.get('/stats', authenticateToken, statsController.getAdminStats);

module.exports = router;

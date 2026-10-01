const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateToken } = require('../middleware/auth');

router.post('/', orderController.createOrder);
router.get('/', authenticateToken, orderController.getOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id/status', authenticateToken, orderController.updateOrderStatus);

module.exports = router;

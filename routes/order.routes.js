const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

router.post('/place', authenticateToken, orderController.placeOrder);
router.get('/history/:userId', authenticateToken, orderController.getOrderHistory);

module.exports = router;

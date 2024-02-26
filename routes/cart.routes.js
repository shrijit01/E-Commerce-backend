const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

router.post('/add', authenticateToken, cartController.addToCart);
router.get('/:userId', authenticateToken, cartController.viewCart);
router.delete('/remove', authenticateToken, cartController.removeFromCart);

module.exports = router;

const express = require('express');
const router = express.Router();
const orderDetailsController = require('../controllers/orderDetails.controller');

router.get('/:orderId', orderDetailsController.getOrderDetailsById);

module.exports = router;

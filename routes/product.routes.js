const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.get('/categories', productController.getCategories);
router.get('/categories/:categoryId/products', productController.getProductsByCategory);
router.get('/products/:productId', productController.getProductById);

module.exports = router;

const db = require('../Models/db');

const getCategories = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM categories');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getProductsByCategory = async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
        const [rows] = await db.query('SELECT * FROM products WHERE category_id = ?', [categoryId]);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getProductById = async (req, res) => {
    const productId = req.params.productId;
    try {
        const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [productId]);
        if (rows.length === 0) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { getCategories, getProductsByCategory, getProductById };

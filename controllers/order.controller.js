const db = require('../Models/db');

const placeOrder = async (req, res) => {
    const { userId, products } = req.body;
    try {
        const [result] = await db.query('INSERT INTO orders (user_id) VALUES (?)', [userId]);
        const orderId = result.insertId;

        const values = products.map(product => [orderId, product.productId, product.quantity]);
        await db.query('INSERT INTO order_items (order_id, product_id, quantity) VALUES ?', [values]);

        res.status(201).json({ message: 'Order placed successfully', orderId });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getOrderHistory = async (req, res) => {
    const userId = req.params.userId;
    try {
        const [rows] = await db.query('SELECT * FROM orders WHERE user_id = ?', [userId]);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching order history:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { placeOrder, getOrderHistory };

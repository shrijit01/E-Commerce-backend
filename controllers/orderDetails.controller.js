const db = require('../Models/db');

const getOrderDetailsById = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const [orderRows] = await db.query('SELECT * FROM orders WHERE id = ?', [orderId]);
        if (orderRows.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const [orderItemsRows] = await db.query('SELECT * FROM order_items WHERE order_id = ?', [orderId]);
        const order = orderRows[0];
        order.orderItems = orderItemsRows;

        res.json(order);
    } catch (error) {
        console.error('Error fetching order details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { getOrderDetailsById };

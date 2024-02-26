const db = require('../Models/db');

const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {

        const [productRows] = await db.query('SELECT * FROM products WHERE id = ?', [productId]);
        if (productRows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }


        const [cartItemRows] = await db.query('SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?', [userId, productId]);
        if (cartItemRows.length === 0) {
            await db.query('INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)', [userId, productId, quantity]);
        } else {
            await db.query('UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ?', [quantity, userId, productId]);
        }

        res.status(201).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const viewCart = async (req, res) => {
    const userId = req.params.userId;
    try {
        const [rows] = await db.query('SELECT ci.*, p.title, p.price FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.user_id = ?', [userId]);
        res.json(rows);
    } catch (error) {
        console.error('Error viewing cart:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const removeFromCart = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        await db.query('DELETE FROM cart_items WHERE user_id = ? AND product_id = ?', [userId, productId]);
        res.json({ message: 'Product removed from cart successfully' });
    } catch (error) {
        console.error('Error removing product from cart:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { addToCart, viewCart, removeFromCart };

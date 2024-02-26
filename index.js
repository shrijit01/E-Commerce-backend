const express = require('express');
const db = require('./Models/db'); 
const authRoutes = require('./routes/auth.routes'); 
const productRoutes = require('./routes/product.routes'); 
const cartRoutes = require('./routes/cart.routes'); 
const orderRoutes = require('./routes/order.routes');
const orderDetailsRoutes = require('./routes/orderDetails.Routes'); 
const { errorHandler } = require('./middleware/error.middleware'); 
const app = express();
const PORT = process.env.PORT || 3000;

db.query('SELECT 1 + 1 AS result')
    .then(([rows, fields]) => {
        console.log('Connected to MySQL database');
    })
    .catch(error => {
        console.error('Error connecting to MySQL database:', error);
    });

/*  middleware */
app.use(express.json());

/* Routes */
app.use('/auth', authRoutes); 
app.use('/products', productRoutes); 
app.use('/cart', cartRoutes); 
app.use('/order', orderRoutes); 
app.use('/order-details', orderDetailsRoutes); 

app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Hello from your e-commerce backend!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

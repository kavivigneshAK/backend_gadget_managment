const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gadgethub')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Error:', err));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/users', require('./routes/users'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/wishlist', require('./routes/wishlist'));

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Gadget Hub API Server',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      admin: '/api/admin',
      products: '/api/products',
      cart: '/api/cart',
      users: '/api/users',
      orders: '/api/orders',
      contact: '/api/contact',
      wishlist: '/api/wishlist'
    }
  });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`🚀 Gadget Hub API Server running on port ${PORT}`);
  console.log(`📊 API Documentation: http://localhost:${PORT}`);
});
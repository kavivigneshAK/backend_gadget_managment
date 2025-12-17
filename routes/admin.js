const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all users (admin only)
router.get('/users', auth, adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all orders (admin only)
router.get('/orders', auth, adminAuth, async (req, res) => {
  try {
    const Order = require('../models/Order');
    const orders = await Order.find()
      .populate('userId', 'name email')
      .populate('items.productId', 'name price images')
      .sort({ createdAt: -1 });
    
    // Format for backward compatibility
    const formattedOrders = orders.map(order => ({
      orderId: order.orderId,
      userName: order.userName,
      userEmail: order.userEmail,
      items: order.items,
      total: order.total,
      status: order.status,
      date: order.orderDate
    }));
    
    res.json(formattedOrders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get dashboard stats (admin only)
router.get('/stats', auth, adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    
    const Order = require('../models/Order');
    const orders = await Order.find();
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    
    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
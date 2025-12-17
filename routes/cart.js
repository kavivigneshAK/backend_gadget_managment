const express = require('express');
const User = require('../models/User');
const Order = require('../models/Order');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get cart
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ cart: user.cart, wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add to cart
router.post('/add', auth, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const user = await User.findById(req.user._id);
    
    if (!user.cart) user.cart = [];
    
    const existingItem = user.cart.find(item => item.productId && item.productId.toString() === productId.toString());
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 0) + parseInt(quantity);
    } else {
      user.cart.push({ productId, quantity: parseInt(quantity) });
    }
    
    await user.save();
    res.json({ success: true, cart: user.cart, message: 'Added to cart successfully' });
  } catch (error) {
    console.error('Cart add error:', error);
    res.status(500).json({ message: 'Failed to add to cart', error: error.message });
  }
});

// Remove from cart
router.post('/remove', auth, async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);
    
    user.cart = user.cart.filter(item => item.productId.toString() !== productId.toString());
    await user.save();
    res.json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Wishlist toggle
router.post('/wishlist', auth, async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);
    
    if (!user.wishlist) user.wishlist = [];
    
    const existingIndex = user.wishlist.findIndex(item => item.productId && item.productId.toString() === productId.toString());
    let isAdded = false;
    
    if (existingIndex > -1) {
      user.wishlist.splice(existingIndex, 1);
      isAdded = false;
    } else {
      user.wishlist.push({ productId });
      isAdded = true;
    }
    
    await user.save();
    res.json({ 
      success: true, 
      wishlist: user.wishlist.map(item => item.productId.toString()),
      isAdded,
      message: isAdded ? 'Added to wishlist' : 'Removed from wishlist'
    });
  } catch (error) {
    console.error('Wishlist error:', error);
    res.status(500).json({ message: 'Failed to update wishlist', error: error.message });
  }
});

// Checkout
router.post('/checkout', auth, async (req, res) => {
  try {
    const { items, total, subtotal, tax, address, paymentMethod } = req.body;
    const user = await User.findById(req.user._id);

    
    const orderData = {
      orderId: `ORD${Date.now()}`,
      userId: user._id,
      userName: user.name,
      userEmail: user.email,
      items: items || [],
      total: parseFloat(total) || 0,
      subtotal: parseFloat(subtotal) || 0,
      tax: parseFloat(tax) || 0,
      address: address || 'Not provided',
      paymentMethod: paymentMethod || 'COD',
      status: 'Confirmed'
    };
    
    // Create order in Orders collection
    const order = new Order(orderData);
    const savedOrder = await order.save();
    console.log('✅ Order saved to Orders collection:', savedOrder.orderId);
    
    // Also save to user orders for backward compatibility
    if (!user.orders) user.orders = [];
    user.orders.push({
      orderId: orderData.orderId,
      items: orderData.items,
      total: orderData.total,
      address: orderData.address,
      paymentMethod: orderData.paymentMethod,
      status: orderData.status,
      date: new Date()
    });
    
    // Clear cart
    user.cart = [];
    await user.save();
    console.log('✅ Order also saved to user.orders');
    
    res.json({ success: true, order: savedOrder, message: 'Order placed successfully' });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ message: 'Failed to place order', error: error.message });
  }
});

module.exports = router;
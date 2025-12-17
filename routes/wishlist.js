const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get user's wishlist
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist.productId');
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add item to wishlist
router.post('/add/:productId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const productExists = user.wishlist.find(item => item.productId.toString() === req.params.productId);
    
    if (productExists) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }
    
    user.wishlist.push({ productId: req.params.productId });
    await user.save();
    
    res.json({ message: 'Product added to wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove item from wishlist
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.wishlist = user.wishlist.filter(item => item.productId.toString() !== req.params.productId);
    await user.save();
    
    res.json({ message: 'Product removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add wishlist item to cart
router.post('/add-to-cart/:productId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const cartItem = user.cart.find(item => item.productId.toString() === req.params.productId);
    
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      user.cart.push({ productId: req.params.productId, quantity: 1 });
    }
    
    await user.save();
    res.json({ message: 'Product added to cart from wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
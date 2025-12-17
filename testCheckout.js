const mongoose = require('mongoose');
const User = require('./models/User');
const Order = require('./models/Order');

const testCheckout = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/gadgethub');
    
    // Find John's user
    const user = await User.findOne({ email: 'john@example.com' });
    if (!user) {
      console.log('❌ User not found');
      return;
    }
    
    console.log('✅ Found user:', user.name);
    
    // Add item to cart first
    user.cart = [{
      productId: '6941306770111e1d56e6e21a',
      quantity: 2
    }];
    await user.save();
    console.log('✅ Added item to cart');
    
    // Simulate checkout
    const orderData = {
      orderId: `ORD${Date.now()}`,
      userId: user._id,
      userName: user.name,
      userEmail: user.email,
      items: [{
        productId: '6941306770111e1d56e6e21a',
        name: 'iPhone 15 Pro',
        price: 134900,
        quantity: 2,
        image: 'test.jpg'
      }],
      total: 318444,
      subtotal: 269800,
      tax: 48644,
      address: 'Test Address',
      paymentMethod: 'COD',
      status: 'Confirmed'
    };
    
    // Create order
    const order = new Order(orderData);
    const savedOrder = await order.save();
    console.log('✅ Order created:', savedOrder.orderId);
    
    // Clear cart
    user.cart = [];
    await user.save();
    console.log('✅ Cart cleared');
    
    // Verify order exists
    const orders = await Order.find();
    console.log('📊 Total orders in collection:', orders.length);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    mongoose.connection.close();
  }
};

testCheckout();
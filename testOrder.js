const mongoose = require('mongoose');
const Order = require('./models/Order');

const testOrder = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/gadgethub');
    
    // Check if orders collection exists
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
    // Check existing orders
    const orders = await Order.find();
    console.log('Existing orders:', orders.length);
    
    // Create a test order
    const testOrderData = {
      orderId: `TEST${Date.now()}`,
      userId: '694196fb94535d9024f7d64c', // John's ID
      userName: 'Test User',
      userEmail: 'test@test.com',
      items: [{
        productId: '6941306770111e1d56e6e21a',
        name: 'Test Product',
        price: 1000,
        quantity: 1,
        image: 'test.jpg'
      }],
      total: 1180,
      subtotal: 1000,
      tax: 180,
      address: 'Test Address',
      paymentMethod: 'COD',
      status: 'Confirmed'
    };
    
    const order = new Order(testOrderData);
    await order.save();
    console.log('✅ Test order created:', order.orderId);
    
    // Verify it was saved
    const savedOrder = await Order.findOne({ orderId: order.orderId });
    console.log('✅ Order verified in DB:', savedOrder ? 'Found' : 'Not found');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
};

testOrder();
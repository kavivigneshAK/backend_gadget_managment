const mongoose = require('mongoose');
const Order = require('./models/Order');

const checkOrders = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/gadgethub');
    
    const orders = await Order.find().sort({ createdAt: -1 });
    
    console.log(`📊 Found ${orders.length} orders in collection:`);
    
    orders.forEach((order, index) => {
      console.log(`\n${index + 1}. Order ID: ${order.orderId}`);
      console.log(`   User: ${order.userName} (${order.userEmail})`);
      console.log(`   Total: ₹${order.total}`);
      console.log(`   Items: ${order.items.length}`);
      console.log(`   Status: ${order.status}`);
      console.log(`   Date: ${order.orderDate}`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
};

checkOrders();
const mongoose = require('mongoose');
const Order = require('./models/Order');

const verifyCheckout = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/gadgethub');
    
    console.log('🔍 Checking Orders collection...\n');
    
    const orders = await Order.find().sort({ createdAt: -1 }).limit(5);
    
    if (orders.length === 0) {
      console.log('❌ No orders found in Orders collection');
      console.log('💡 Try placing an order through the UI to test');
    } else {
      console.log(`✅ Found ${orders.length} recent orders:\n`);
      
      orders.forEach((order, index) => {
        console.log(`${index + 1}. ${order.orderId}`);
        console.log(`   User: ${order.userName}`);
        console.log(`   Total: ₹${order.total?.toLocaleString()}`);
        console.log(`   Items: ${order.items?.length}`);
        console.log(`   Date: ${new Date(order.createdAt).toLocaleString()}`);
        console.log('');
      });
    }
    
    // Check total count
    const totalCount = await Order.countDocuments();
    console.log(`📊 Total orders in collection: ${totalCount}`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    mongoose.connection.close();
  }
};

verifyCheckout();
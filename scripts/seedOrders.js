const mongoose = require('mongoose');
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

const seedOrders = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/gadgethub');
    
    // Get sample users and products
    const users = await User.find().limit(3);
    const products = await Product.find().limit(5);
    
    if (users.length === 0 || products.length === 0) {
      console.log('No users or products found. Please seed users and products first.');
      return;
    }
    
    const statuses = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    const orders = [];
    
    for (let i = 0; i < 15; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      const numItems = Math.floor(Math.random() * 3) + 1;
      const orderItems = [];
      let total = 0;
      
      for (let j = 0; j < numItems; j++) {
        const product = products[Math.floor(Math.random() * products.length)];
        const quantity = Math.floor(Math.random() * 3) + 1;
        const itemTotal = product.price * quantity;
        
        orderItems.push({
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          image: product.images?.[0] || product.image
        });
        
        total += itemTotal;
      }
      
      orders.push({
        orderId: `ORD${Date.now()}${i}`,
        userId: user._id,
        userName: user.name,
        userEmail: user.email,
        items: orderItems,
        total: total,
        subtotal: total,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        orderDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      });
    }
    
    await Order.deleteMany({});
    await Order.insertMany(orders);
    
    console.log(`✅ Seeded ${orders.length} orders with various statuses`);
    
    for (const status of statuses) {
      const count = orders.filter(order => order.status === status).length;
      console.log(`  ${status}: ${count} orders`);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding orders:', error);
    process.exit(1);
  }
};

seedOrders();
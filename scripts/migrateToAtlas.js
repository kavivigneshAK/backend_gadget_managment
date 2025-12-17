const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Contact = require('../models/Contact');

const migrateData = async () => {
  try {
    console.log('🔄 Starting data migration to Atlas...');
    
    // Connect to local MongoDB first
    console.log('📡 Connecting to local MongoDB...');
    await mongoose.connect('mongodb://localhost:27017/gadgethub');
    
    // Fetch all data from local database
    console.log('📥 Fetching data from local database...');
    const localUsers = await User.find({});
    const localProducts = await Product.find({});
    const localOrders = await Order.find({});
    const localContacts = await Contact.find({});
    
    console.log(`Found: ${localUsers.length} users, ${localProducts.length} products, ${localOrders.length} orders, ${localContacts.length} contacts`);
    
    // Disconnect from local
    await mongoose.disconnect();
    
    // Connect to Atlas
    console.log('☁️ Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Clear existing data in Atlas (optional - remove if you want to keep existing data)
    console.log('🗑️ Clearing existing Atlas data...');
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await Contact.deleteMany({});
    
    // Insert data into Atlas
    console.log('📤 Migrating data to Atlas...');
    
    if (localUsers.length > 0) {
      await User.insertMany(localUsers);
      console.log(`✅ Migrated ${localUsers.length} users`);
    }
    
    if (localProducts.length > 0) {
      // Insert products one by one to handle duplicates
      let productCount = 0;
      for (const product of localProducts) {
        try {
          await Product.create(product);
          productCount++;
        } catch (error) {
          if (error.code === 11000) {
            console.log(`⚠️ Skipping duplicate product: ${product.name}`);
          } else {
            console.error(`❌ Error with product ${product.name}:`, error.message);
          }
        }
      }
      console.log(`✅ Migrated ${productCount} products`);
    }
    
    if (localOrders.length > 0) {
      await Order.insertMany(localOrders);
      console.log(`✅ Migrated ${localOrders.length} orders`);
    }
    
    if (localContacts.length > 0) {
      await Contact.insertMany(localContacts);
      console.log(`✅ Migrated ${localContacts.length} contacts`);
    }
    
    console.log('🎉 Migration completed successfully!');
    console.log('🌐 Your data is now available on Atlas at:', process.env.MONGODB_URI);
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

migrateData();
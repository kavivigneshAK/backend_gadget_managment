const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/gadgethub');
    
    const adminExists = await User.findOne({ email: 'admin@gadgethub.com' });
    if (adminExists) {
      console.log('Admin user already exists');
      return;
    }
    
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = new User({
      name: 'Admin User',
      email: 'admin@gadgethub.com',
      password: hashedPassword,
      role: 'admin'
    });
    
    await admin.save();
    console.log('✅ Admin user created successfully');
    console.log('📧 Email: admin@gadgethub.com');
    console.log('🔑 Password: admin123');
    
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    mongoose.connection.close();
  }
};

createAdmin();
const mongoose = require('mongoose');

require('dotenv').config();
const atlasUri = process.env.MONGODB_URI;

const testConnection = async () => {
  try {
    console.log('🔄 Testing Atlas connection...');
    await mongoose.connect(atlasUri, {
      serverSelectionTimeoutMS: 5000
    });
    
    console.log('✅ Successfully connected to Atlas!');
    
    // Test creating a simple document
    const testSchema = new mongoose.Schema({ test: String });
    const TestModel = mongoose.model('Test', testSchema);
    
    await TestModel.create({ test: 'Connection successful' });
    console.log('✅ Test document created successfully!');
    
    await TestModel.deleteMany({});
    console.log('✅ Test document cleaned up!');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

testConnection();
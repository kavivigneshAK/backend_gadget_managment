const mongoose = require('mongoose');
const Product = require('./models/Product');

const addTestProduct = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/gadgethub');
    
    const productData = {
      name: 'Admin Added iPhone 16',
      category: 'Smartphones',
      price: 89999,
      description: 'Latest iPhone added by admin',
      images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600'],
      stock: 25,
      isActive: true
    };
    
    console.log('Creating product with data:', productData);
    
    const product = new Product(productData);
    const savedProduct = await product.save();
    
    console.log('✅ Product created successfully!');
    console.log('Product ID:', savedProduct._id);
    console.log('Product Name:', savedProduct.name);
    
    // Verify it exists
    const count = await Product.countDocuments();
    console.log('📊 Total products in database:', count);
    
  } catch (error) {
    console.error('❌ Error creating product:', error);
  } finally {
    mongoose.connection.close();
  }
};

addTestProduct();
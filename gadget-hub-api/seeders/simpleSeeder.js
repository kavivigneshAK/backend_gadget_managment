const mongoose = require('mongoose');
require('dotenv').config();

const products = [
  { name: 'iPhone 15 Pro', category: 'Smartphones', price: 134900, images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600'], description: 'Latest iPhone with A17 Pro chip', stock: 50 },
  { name: 'Samsung Galaxy S24', category: 'Smartphones', price: 79999, images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600'], description: 'Flagship Samsung smartphone', stock: 45 },
  { name: 'OnePlus 12', category: 'Smartphones', price: 64999, images: ['https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600'], description: 'Premium OnePlus device', stock: 40 },
  { name: 'Google Pixel 8', category: 'Smartphones', price: 75999, images: ['https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600'], description: 'Google AI-powered smartphone', stock: 35 },
  { name: 'Xiaomi 14', category: 'Smartphones', price: 69999, images: ['https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600'], description: 'Xiaomi flagship phone', stock: 30 },
  { name: 'MacBook Pro M3', category: 'Laptops', price: 199900, images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600'], description: 'Apple M3 chip laptop', stock: 25 },
  { name: 'Dell XPS 13', category: 'Laptops', price: 89990, images: ['https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600'], description: 'Dell premium ultrabook', stock: 30 },
  { name: 'AirPods Pro 2', category: 'Headphones', price: 24900, images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600'], description: 'Apple wireless earbuds', stock: 100 },
  { name: 'Sony WH-1000XM5', category: 'Headphones', price: 29990, images: ['https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600'], description: 'Noise cancelling headphones', stock: 75 },
  { name: 'Apple Watch Series 9', category: 'Smartwatches', price: 41900, images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600'], description: 'Latest Apple Watch', stock: 60 }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gadgethub');
    
    await mongoose.connection.db.collection('products').drop().catch(() => {});
    console.log('Dropped products collection');
    
    const Product = mongoose.model('Product', new mongoose.Schema({
      name: String,
      category: String,
      price: Number,
      images: [String],
      description: String,
      stock: Number,
      isActive: { type: Boolean, default: true }
    }, { timestamps: true }));
    
    await Product.insertMany(products);
    console.log('✅ Successfully seeded products to database');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();
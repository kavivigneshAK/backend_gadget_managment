const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const products = [
  // Smartphones
  { name: 'iPhone 15 Pro Max', category: 'Smartphones', price: 159900, description: 'Latest iPhone with A17 Pro chip', images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600'], stock: 50, isActive: true, sku: 'IPH15PM001' },
  { name: 'Samsung Galaxy S24 Ultra', category: 'Smartphones', price: 129999, description: 'Premium Android flagship', images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600'], stock: 45, isActive: true, sku: 'SGS24U002' },
  { name: 'OnePlus 12', category: 'Smartphones', price: 64999, description: 'Flagship killer with Snapdragon 8 Gen 3', images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600'], stock: 30, isActive: true, sku: 'OP12003' },
  { name: 'Google Pixel 8 Pro', category: 'Smartphones', price: 84999, description: 'AI-powered photography', images: ['https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600'], stock: 25, isActive: true, sku: 'GP8P004' },
  { name: 'Xiaomi 14 Ultra', category: 'Smartphones', price: 79999, description: 'Leica camera system', images: ['https://images.unsplash.com/photo-1567581935884-3349723552ca?w=600'], stock: 35, isActive: true, sku: 'XM14U005' },

  // Laptops
  { name: 'MacBook Pro M3 Max', category: 'Laptops', price: 399900, description: 'Professional laptop with M3 Max chip', images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600'], stock: 20, isActive: true },
  { name: 'Dell XPS 13 Plus', category: 'Laptops', price: 149900, description: 'Ultra-portable Windows laptop', images: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600'], stock: 15, isActive: true },
  { name: 'HP Spectre x360', category: 'Laptops', price: 129900, description: '2-in-1 convertible laptop', images: ['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600'], stock: 18, isActive: true },
  { name: 'Lenovo ThinkPad X1 Carbon', category: 'Laptops', price: 179900, description: 'Business ultrabook', images: ['https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600'], stock: 12, isActive: true },
  { name: 'ASUS ROG Zephyrus G14', category: 'Laptops', price: 199900, description: 'Gaming laptop with RTX 4070', images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600'], stock: 10, isActive: true },

  // Headphones
  { name: 'AirPods Pro 2nd Gen', category: 'Headphones', price: 26900, description: 'Active noise cancellation', images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600'], stock: 100, isActive: true },
  { name: 'Sony WH-1000XM5', category: 'Headphones', price: 34900, description: 'Industry-leading noise canceling', images: ['https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600'], stock: 60, isActive: true },
  { name: 'Bose QuietComfort Ultra', category: 'Headphones', price: 39900, description: 'Immersive audio experience', images: ['https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600'], stock: 40, isActive: true },
  { name: 'Sennheiser Momentum 4', category: 'Headphones', price: 32900, description: 'Audiophile wireless headphones', images: ['https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600'], stock: 25, isActive: true },
  { name: 'Audio-Technica ATH-M50xBT2', category: 'Headphones', price: 19900, description: 'Professional monitor headphones', images: ['https://images.unsplash.com/photo-1558756520-22cfe5d382ca?w=600'], stock: 35, isActive: true },

  // Smartwatches
  { name: 'Apple Watch Ultra 2', category: 'Smartwatches', price: 89900, description: 'Rugged and capable', images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600'], stock: 30, isActive: true },
  { name: 'Samsung Galaxy Watch 6 Classic', category: 'Smartwatches', price: 42900, description: 'Premium Android smartwatch', images: ['https://images.unsplash.com/photo-1579586337278-3f436f25d4d6?w=600'], stock: 25, isActive: true },
  { name: 'Garmin Fenix 7X', category: 'Smartwatches', price: 79900, description: 'Multisport GPS watch', images: ['https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600'], stock: 15, isActive: true },
  { name: 'Fitbit Sense 2', category: 'Smartwatches', price: 29900, description: 'Health and fitness focused', images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600'], stock: 40, isActive: true },
  { name: 'Amazfit GTR 4', category: 'Smartwatches', price: 19900, description: 'Long battery life smartwatch', images: ['https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600'], stock: 50, isActive: true },

  // Cameras
  { name: 'Canon EOS R5 Mark II', category: 'Cameras', price: 389999, description: 'Professional mirrorless camera', images: ['https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600'], stock: 8, isActive: true },
  { name: 'Sony A7R V', category: 'Cameras', price: 359999, description: 'High-resolution full-frame', images: ['https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=600'], stock: 6, isActive: true },
  { name: 'Nikon Z9', category: 'Cameras', price: 499999, description: 'Flagship mirrorless camera', images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600'], stock: 5, isActive: true },
  { name: 'Fujifilm X-T5', category: 'Cameras', price: 169999, description: 'APS-C mirrorless camera', images: ['https://images.unsplash.com/photo-1495121553079-4c61bcce1894?w=600'], stock: 12, isActive: true },
  { name: 'Panasonic Lumix GH6', category: 'Cameras', price: 219999, description: 'Video-focused mirrorless', images: ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600'], stock: 10, isActive: true },

  // Gaming Gear
  { name: 'PlayStation 5 Pro', category: 'Gaming Gear', price: 74990, description: 'Next-gen gaming console', images: ['https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600'], stock: 20, isActive: true },
  { name: 'Xbox Series X', category: 'Gaming Gear', price: 54990, description: 'Most powerful Xbox ever', images: ['https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=600'], stock: 25, isActive: true },
  { name: 'Nintendo Switch OLED', category: 'Gaming Gear', price: 34990, description: 'Portable gaming console', images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600'], stock: 40, isActive: true },
  { name: 'Steam Deck OLED', category: 'Gaming Gear', price: 54990, description: 'Handheld PC gaming', images: ['https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600'], stock: 15, isActive: true },
  { name: 'Razer DeathAdder V3 Pro', category: 'Gaming Gear', price: 14990, description: 'Wireless gaming mouse', images: ['https://images.unsplash.com/photo-1527814050087-3793815479db?w=600'], stock: 60, isActive: true },

  // Tablets
  { name: 'iPad Pro 12.9" M2', category: 'Tablets', price: 109900, description: 'Professional tablet with M2 chip', images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600'], stock: 30, isActive: true },
  { name: 'Samsung Galaxy Tab S9 Ultra', category: 'Tablets', price: 119900, description: 'Premium Android tablet', images: ['https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600'], stock: 20, isActive: true },
  { name: 'Microsoft Surface Pro 9', category: 'Tablets', price: 129900, description: '2-in-1 Windows tablet', images: ['https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=600'], stock: 15, isActive: true },
  { name: 'Lenovo Tab P12 Pro', category: 'Tablets', price: 64900, description: 'OLED display tablet', images: ['https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=600'], stock: 25, isActive: true },
  { name: 'Huawei MatePad Pro', category: 'Tablets', price: 54900, description: 'HarmonyOS tablet', images: ['https://images.unsplash.com/photo-1592179900824-3d9e4d8f4edc?w=600'], stock: 18, isActive: true },

  // Accessories
  { name: 'MagSafe Charger', category: 'Accessories', price: 4500, description: 'Wireless charging for iPhone', images: ['https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600'], stock: 200, isActive: true },
  { name: 'Anker PowerCore 26800', category: 'Accessories', price: 5999, description: 'High-capacity power bank', images: ['https://images.unsplash.com/photo-1609592806787-3d9c1b8e5e8e?w=600'], stock: 150, isActive: true },
  { name: 'Belkin USB-C Hub 7-in-1', category: 'Accessories', price: 7999, description: 'Multi-port USB-C adapter', images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600'], stock: 100, isActive: true },
  { name: 'Apple AirTag 4-Pack', category: 'Accessories', price: 11900, description: 'Item tracking devices', images: ['https://images.unsplash.com/photo-1635514569146-9a9607ecf303?w=600'], stock: 80, isActive: true },
  { name: 'Peak Design Everyday Backpack', category: 'Accessories', price: 24900, description: 'Camera and tech backpack', images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600'], stock: 40, isActive: true }
];

const seedProducts = async () => {
  try {
    console.log('🔄 Connecting to Atlas...');
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('🗑️ Clearing existing products...');
    await Product.deleteMany({});
    
    // Add unique SKUs to products
    const productsWithSKU = products.map((product, index) => ({
      ...product,
      sku: `GH${String(index + 1).padStart(3, '0')}`
    }));
    
    console.log('📦 Adding products to Atlas...');
    await Product.insertMany(productsWithSKU);
    
    console.log(`✅ Successfully added ${productsWithSKU.length} products to Atlas!`);
    
    // Show category breakdown
    const categories = {};
    productsWithSKU.forEach(product => {
      categories[product.category] = (categories[product.category] || 0) + 1;
    });
    
    console.log('\n📊 Products by category:');
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`  ${category}: ${count} products`);
    });
    
  } catch (error) {
    console.error('❌ Error seeding products:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seedProducts();
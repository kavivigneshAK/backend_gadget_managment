const mongoose = require('mongoose');
const Product = require('../models/Product');

const additionalProducts = [
  // Tablets (5 products)
  {
    name: 'iPad Pro 12.9"',
    category: 'Tablets',
    price: 109900,
    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600'],
    description: 'Apple iPad Pro with M2 chip',
    stock: 30,
    isActive: true
  },
  {
    name: 'Samsung Galaxy Tab S9',
    category: 'Tablets',
    price: 72999,
    images: ['https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600'],
    description: 'Premium Android tablet',
    stock: 25,
    isActive: true
  },
  {
    name: 'Microsoft Surface Pro 9',
    category: 'Tablets',
    price: 89999,
    images: ['https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=600'],
    description: '2-in-1 Windows tablet',
    stock: 20,
    isActive: true
  },
  {
    name: 'Lenovo Tab P11 Pro',
    category: 'Tablets',
    price: 44999,
    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600'],
    description: 'OLED display tablet',
    stock: 35,
    isActive: true
  },
  {
    name: 'Huawei MatePad Pro',
    category: 'Tablets',
    price: 54999,
    images: ['https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600'],
    description: 'HarmonyOS tablet',
    stock: 15,
    isActive: true
  },

  // Accessories (5 products)
  {
    name: 'MagSafe Charger',
    category: 'Accessories',
    price: 4500,
    images: ['https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600'],
    description: 'Wireless charging pad',
    stock: 100,
    isActive: true
  },
  {
    name: 'Anker PowerBank 20000mAh',
    category: 'Accessories',
    price: 3999,
    images: ['https://images.unsplash.com/photo-1609592806787-3d0b7c7c8f6e?w=600'],
    description: 'Fast charging power bank',
    stock: 80,
    isActive: true
  },
  {
    name: 'Belkin USB-C Hub',
    category: 'Accessories',
    price: 7999,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600'],
    description: '7-in-1 connectivity hub',
    stock: 50,
    isActive: true
  },
  {
    name: 'Apple AirTag 4-Pack',
    category: 'Accessories',
    price: 10900,
    images: ['https://images.unsplash.com/photo-1621570180008-b9c5c4d5b8c2?w=600'],
    description: 'Item tracking devices',
    stock: 60,
    isActive: true
  },
  {
    name: 'Peak Design Phone Case',
    category: 'Accessories',
    price: 4999,
    images: ['https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600'],
    description: 'Magnetic phone case',
    stock: 40,
    isActive: true
  }
];

const seedAdditionalProducts = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/gadgethub');
    
    console.log('Adding 10 new products...');
    
    const existingProducts = await Product.find({ name: { $in: additionalProducts.map(p => p.name) } });
    const existingNames = existingProducts.map(p => p.name);
    
    const newProducts = additionalProducts.filter(p => !existingNames.includes(p.name));
    
    if (newProducts.length > 0) {
      await Product.insertMany(newProducts);
      console.log(`✅ Added ${newProducts.length} new products`);
      newProducts.forEach(p => console.log(`  - ${p.name}`));
    } else {
      console.log('⚠️  All products already exist');
    }
    
    const totalProducts = await Product.countDocuments();
    console.log(`🎉 Database now has ${totalProducts} products total!`);
    
  } catch (error) {
    console.error('Error adding products:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedAdditionalProducts();
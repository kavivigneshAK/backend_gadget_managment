const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const products = [
  { name: 'iPhone 15 Pro', category: 'Smartphones', price: 134900, images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600'], description: 'Latest iPhone with A17 Pro chip', stock: 50 },
  { name: 'Samsung Galaxy S24', category: 'Smartphones', price: 79999, images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600'], description: 'Flagship Samsung smartphone', stock: 45 },
  { name: 'OnePlus 12', category: 'Smartphones', price: 64999, images: ['https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600'], description: 'Premium OnePlus device', stock: 40 },
  { name: 'Google Pixel 8', category: 'Smartphones', price: 75999, images: ['https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600'], description: 'Google AI-powered smartphone', stock: 35 },
  { name: 'Xiaomi 14', category: 'Smartphones', price: 69999, images: ['https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600'], description: 'Xiaomi flagship phone', stock: 30 },
  { name: 'Vivo X100', category: 'Smartphones', price: 63999, images: ['https://images.unsplash.com/photo-1567721913486-6585f069b332?w=600'], description: 'Vivo premium smartphone', stock: 25 },
  { name: 'Oppo Find X7', category: 'Smartphones', price: 71999, images: ['https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600'], description: 'Oppo flagship device', stock: 20 },
  { name: 'Nothing Phone 2', category: 'Smartphones', price: 44999, images: ['https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=600'], description: 'Unique transparent design', stock: 15 },
  { name: 'Realme GT 5', category: 'Smartphones', price: 42999, images: ['https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600'], description: 'Gaming-focused smartphone', stock: 10 },
  { name: 'Motorola Edge 50', category: 'Smartphones', price: 39999, images: ['https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600'], description: 'Motorola edge series', stock: 5 },
  
  { name: 'MacBook Pro M3', category: 'Laptops', price: 199900, images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600'], description: 'Apple M3 chip laptop', stock: 25 },
  { name: 'Dell XPS 13', category: 'Laptops', price: 89990, images: ['https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600'], description: 'Dell premium ultrabook', stock: 30 },
  { name: 'ThinkPad X1 Carbon', category: 'Laptops', price: 125000, images: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600'], description: 'Business laptop', stock: 20 },
  { name: 'HP Spectre x360', category: 'Laptops', price: 115000, images: ['https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=600'], description: 'Convertible laptop', stock: 15 },
  { name: 'ASUS ROG Strix G15', category: 'Laptops', price: 145000, images: ['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600'], description: 'Gaming laptop', stock: 10 },
  { name: 'Surface Laptop 5', category: 'Laptops', price: 98000, images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600'], description: 'Microsoft Surface laptop', stock: 25 },
  { name: 'MacBook Air M2', category: 'Laptops', price: 114900, images: ['https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=600'], description: 'Apple M2 chip laptop', stock: 35 },
  { name: 'Acer Swift 3', category: 'Laptops', price: 55000, images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600'], description: 'Budget-friendly laptop', stock: 40 },
  { name: 'LG Gram 17', category: 'Laptops', price: 135000, images: ['https://images.unsplash.com/photo-1587614295999-6c1c3a7b98d2?w=600'], description: 'Ultra-light laptop', stock: 12 },
  { name: 'MSI Creator Z16', category: 'Laptops', price: 165000, images: ['https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=600'], description: 'Creator laptop', stock: 8 },
  
  { name: 'AirPods Pro 2', category: 'Headphones', price: 24900, images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600'], description: 'Apple wireless earbuds', stock: 100 },
  { name: 'Sony WH-1000XM5', category: 'Headphones', price: 29990, images: ['https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600'], description: 'Noise cancelling headphones', stock: 75 },
  { name: 'Bose QuietComfort 45', category: 'Headphones', price: 32900, images: ['https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600'], description: 'Premium noise cancelling', stock: 60 },
  { name: 'Sennheiser HD 660S', category: 'Headphones', price: 49990, images: ['https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600'], description: 'Audiophile headphones', stock: 30 },
  { name: 'JBL Live 660NC', category: 'Headphones', price: 9999, images: ['https://images.unsplash.com/photo-1558756520-22cfe5d382ca?w=600'], description: 'Wireless headphones', stock: 80 },
  { name: 'Audio-Technica ATH-M50x', category: 'Headphones', price: 15900, images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600'], description: 'Studio headphones', stock: 50 },
  { name: 'Beats Studio3 Wireless', category: 'Headphones', price: 22900, images: ['https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=600'], description: 'Beats wireless headphones', stock: 45 },
  { name: 'Marshall Major IV', category: 'Headphones', price: 12999, images: ['https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=600'], description: 'Marshall headphones', stock: 35 },
  { name: 'Skullcandy Crusher Evo', category: 'Headphones', price: 14999, images: ['https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600'], description: 'Bass-heavy headphones', stock: 40 },
  { name: 'Plantronics BackBeat Pro 2', category: 'Headphones', price: 18999, images: ['https://images.unsplash.com/photo-1545127398-14699f92334b?w=600'], description: 'Professional headphones', stock: 25 },
  
  { name: 'Apple Watch Series 9', category: 'Smartwatches', price: 41900, images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600'], description: 'Latest Apple Watch', stock: 60 },
  { name: 'Samsung Galaxy Watch 6', category: 'Smartwatches', price: 32999, images: ['https://images.unsplash.com/photo-1579586337278-3f436f25d4d6?w=600'], description: 'Samsung smartwatch', stock: 45 },
  { name: 'Garmin Forerunner 965', category: 'Smartwatches', price: 59990, images: ['https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600'], description: 'GPS running watch', stock: 30 },
  { name: 'Fitbit Versa 4', category: 'Smartwatches', price: 22999, images: ['https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600'], description: 'Fitness smartwatch', stock: 50 },
  { name: 'Amazfit GTR 4', category: 'Smartwatches', price: 18999, images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600'], description: 'Affordable smartwatch', stock: 70 },
  { name: 'Fossil Gen 6', category: 'Smartwatches', price: 24995, images: ['https://images.unsplash.com/photo-1544117519-31a4b719223d?w=600'], description: 'Wear OS smartwatch', stock: 35 },
  { name: 'Huawei Watch GT 4', category: 'Smartwatches', price: 26999, images: ['https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=600'], description: 'Huawei smartwatch', stock: 40 },
  { name: 'OnePlus Watch 2', category: 'Smartwatches', price: 24999, images: ['https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=600'], description: 'OnePlus smartwatch', stock: 25 },
  { name: 'Suunto 9 Peak Pro', category: 'Smartwatches', price: 54990, images: ['https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600'], description: 'Adventure watch', stock: 20 },
  { name: 'Polar Vantage V3', category: 'Smartwatches', price: 49990, images: ['https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600'], description: 'Training watch', stock: 15 },
  
  { name: 'Canon EOS R6 Mark II', category: 'Cameras', price: 219999, images: ['https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600'], description: 'Professional camera', stock: 15 },
  { name: 'Sony A7 IV', category: 'Cameras', price: 249999, images: ['https://images.unsplash.com/photo-1519183071298-a2962be54a07?w=600'], description: 'Mirrorless camera', stock: 12 },
  { name: 'Nikon Z6 III', category: 'Cameras', price: 199999, images: ['https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=600'], description: 'Full-frame camera', stock: 10 },
  { name: 'Fujifilm X-T5', category: 'Cameras', price: 169999, images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600'], description: 'APS-C camera', stock: 18 },
  { name: 'Canon EOS R8', category: 'Cameras', price: 149999, images: ['https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=600'], description: 'Entry-level full frame', stock: 20 },
  { name: 'Sony A6700', category: 'Cameras', price: 134999, images: ['https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600'], description: 'APS-C mirrorless', stock: 25 },
  { name: 'Olympus OM-1', category: 'Cameras', price: 219999, images: ['https://images.unsplash.com/photo-1519183071298-a2962be54a07?w=600'], description: 'Micro Four Thirds', stock: 8 },
  { name: 'Panasonic GH6', category: 'Cameras', price: 199999, images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600'], description: 'Video-focused camera', stock: 12 },
  { name: 'Leica Q2', category: 'Cameras', price: 549999, images: ['https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=600'], description: 'Luxury compact camera', stock: 5 },
  { name: 'GoPro Hero 12', category: 'Cameras', price: 44999, images: ['https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600'], description: 'Action camera', stock: 50 },
  
  { name: 'PlayStation 5', category: 'Gaming Gear', price: 54990, images: ['https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600'], description: 'Sony gaming console', stock: 20 },
  { name: 'Xbox Series X', category: 'Gaming Gear', price: 52990, images: ['https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=600'], description: 'Microsoft gaming console', stock: 25 },
  { name: 'Nintendo Switch OLED', category: 'Gaming Gear', price: 37980, images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600'], description: 'Nintendo handheld console', stock: 40 },
  { name: 'Razer DeathAdder V3', category: 'Gaming Gear', price: 7999, images: ['https://images.unsplash.com/photo-1585386959984-a415522b5a3a?w=600'], description: 'Gaming mouse', stock: 100 },
  { name: 'Logitech G Pro X', category: 'Gaming Gear', price: 12999, images: ['https://images.unsplash.com/photo-1527814050087-3793815479db?w=600'], description: 'Gaming headset', stock: 75 },
  { name: 'SteelSeries Apex Pro', category: 'Gaming Gear', price: 19999, images: ['https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600'], description: 'Mechanical keyboard', stock: 60 },
  { name: 'ASUS ROG Swift PG279QM', category: 'Gaming Gear', price: 89999, images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600'], description: 'Gaming monitor', stock: 15 },
  { name: 'HyperX Cloud Alpha', category: 'Gaming Gear', price: 9999, images: ['https://images.unsplash.com/photo-1599669454699-248893623440?w=600'], description: 'Gaming headset', stock: 80 },
  { name: 'Corsair K95 RGB', category: 'Gaming Gear', price: 16999, images: ['https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600'], description: 'RGB keyboard', stock: 45 },
  { name: 'Elgato Stream Deck', category: 'Gaming Gear', price: 14999, images: ['https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600'], description: 'Streaming controller', stock: 30 }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gadgethub');
    
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    await Product.insertMany(products);
    console.log('✅ Successfully seeded 60 products to database');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();
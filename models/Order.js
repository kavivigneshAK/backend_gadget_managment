const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  total: { type: Number, required: true },
  subtotal: { type: Number, required: true },
  tax: { type: Number, default: 0 },
  shipping: { type: Number, default: 0 },
  address: { type: String, default: 'Not provided' },
  paymentMethod: { type: String, default: 'COD' },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Confirmed' },
  orderDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
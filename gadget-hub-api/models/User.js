const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  type: { type: String, enum: ['home', 'work', 'other'], default: 'home' },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, default: 'India' },
  isDefault: { type: Boolean, default: false }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  avatar: { type: String },
  addresses: [addressSchema],
  cart: [{ 
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 },
    addedAt: { type: Date, default: Date.now }
  }],
  wishlist: [{ 
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    addedAt: { type: Date, default: Date.now }
  }],
  lastLogin: { type: Date },
  loginCount: { type: Number, default: 0 },
  orders: [{
    orderId: { type: String, required: true },
    items: [{
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      price: Number,
      quantity: Number
    }],
    total: { type: Number, required: true },
    address: String,
    paymentMethod: String,
    status: { type: String, default: 'Confirmed' },
    date: { type: Date, default: Date.now }
  }],
  preferences: {
    newsletter: { type: Boolean, default: true },
    notifications: { type: Boolean, default: true },
    theme: { type: String, enum: ['light', 'dark'], default: 'dark' }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
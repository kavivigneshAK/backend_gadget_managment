const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const specificationSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: String, required: true }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String },
  category: { type: String, required: true },
  subcategory: { type: String },
  brand: { type: String },
  model: { type: String },
  sku: { type: String, unique: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  discount: { type: Number, default: 0 },
  images: [{ type: String }],
  description: { type: String },
  shortDescription: { type: String },
  specifications: [specificationSchema],
  features: [{ type: String }],
  stock: { type: Number, default: 100 },
  minStock: { type: Number, default: 10 },
  weight: { type: Number },
  dimensions: {
    length: { type: Number },
    width: { type: Number },
    height: { type: Number }
  },
  warranty: { type: String },
  tags: [{ type: String }],
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  isOnSale: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  reviews: [reviewSchema],
  viewCount: { type: Number, default: 0 },
  salesCount: { type: Number, default: 0 },
  seoTitle: { type: String },
  seoDescription: { type: String },
  seoKeywords: [{ type: String }]
}, { timestamps: true });

// Create slug from name
productSchema.pre('save', function() {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
});

module.exports = mongoose.model('Product', productSchema);
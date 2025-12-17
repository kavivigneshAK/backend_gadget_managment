# Database Schema - Gadget Hub

## Collections/Tables Overview

### 1. Users Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  phone: String,
  dateOfBirth: Date,
  gender: String (enum: ['male', 'female', 'other']),
  role: String (enum: ['user', 'admin'], default: 'user'),
  isActive: Boolean (default: true),
  isVerified: Boolean (default: false),
  avatar: String (URL),
  addresses: [{
    type: String (enum: ['home', 'work', 'other']),
    street: String (required),
    city: String (required),
    state: String (required),
    zipCode: String (required),
    country: String (default: 'India'),
    isDefault: Boolean (default: false)
  }],
  cart: [{
    productId: ObjectId (ref: 'Product'),
    quantity: Number (default: 1),
    addedAt: Date (default: now)
  }],
  wishlist: [{
    productId: ObjectId (ref: 'Product'),
    addedAt: Date (default: now)
  }],
  lastLogin: Date,
  loginCount: Number (default: 0),
  preferences: {
    newsletter: Boolean (default: true),
    notifications: Boolean (default: true),
    theme: String (enum: ['light', 'dark'], default: 'dark')
  },
  createdAt: Date,
  updatedAt: Date
}
```

### 2. Products Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  slug: String (unique, auto-generated),
  category: String (required),
  subcategory: String,
  brand: String,
  model: String,
  sku: String (unique),
  price: Number (required),
  originalPrice: Number,
  discount: Number (default: 0),
  images: [String] (URLs),
  description: String,
  shortDescription: String,
  specifications: [{
    key: String (required),
    value: String (required)
  }],
  features: [String],
  stock: Number (default: 100),
  minStock: Number (default: 10),
  weight: Number,
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  warranty: String,
  tags: [String],
  isActive: Boolean (default: true),
  isFeatured: Boolean (default: false),
  isOnSale: Boolean (default: false),
  rating: Number (default: 0),
  reviewCount: Number (default: 0),
  reviews: [{
    userId: ObjectId (ref: 'User', required),
    userName: String (required),
    rating: Number (required, 1-5),
    comment: String,
    isVerified: Boolean (default: false),
    createdAt: Date (default: now)
  }],
  viewCount: Number (default: 0),
  salesCount: Number (default: 0),
  seoTitle: String,
  seoDescription: String,
  seoKeywords: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### 3. Orders Collection
```javascript
{
  _id: ObjectId,
  orderId: String (required, unique),
  userId: ObjectId (ref: 'User', required),
  items: [{
    productId: ObjectId (ref: 'Product', required),
    name: String (required),
    price: Number (required),
    quantity: Number (required, min: 1),
    image: String
  }],
  subtotal: Number (required),
  tax: Number (required),
  total: Number (required),
  status: String (enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending'),
  shippingAddress: {
    street: String (required),
    city: String (required),
    state: String (required),
    zipCode: String (required),
    country: String (default: 'India')
  },
  paymentMethod: String (enum: ['cod', 'card', 'upi'], default: 'cod'),
  paymentStatus: String (enum: ['pending', 'paid', 'failed'], default: 'pending'),
  trackingNumber: String,
  estimatedDelivery: Date,
  deliveredAt: Date,
  cancelledAt: Date,
  cancelReason: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 4. Contact Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  phone: String,
  subject: String (required),
  message: String (required),
  status: String (enum: ['pending', 'replied', 'resolved'], default: 'pending'),
  adminReply: String,
  repliedAt: Date,
  repliedBy: ObjectId (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

## Indexes

### Users Collection
- `email` (unique)
- `role`
- `isActive`
- `createdAt`

### Products Collection
- `slug` (unique)
- `sku` (unique)
- `category`
- `isActive`
- `isFeatured`
- `price`
- `rating`
- `createdAt`

### Orders Collection
- `orderId` (unique)
- `userId`
- `status`
- `createdAt`

### Contact Collection
- `email`
- `status`
- `createdAt`

## Relationships

1. **Users ↔ Orders**: One-to-Many (userId in Orders)
2. **Users ↔ Cart**: Embedded (cart array in Users)
3. **Users ↔ Wishlist**: Embedded (wishlist array in Users)
4. **Products ↔ Cart Items**: Referenced (productId in cart)
5. **Products ↔ Wishlist Items**: Referenced (productId in wishlist)
6. **Products ↔ Order Items**: Referenced (productId in order items)
7. **Products ↔ Reviews**: Embedded (reviews array in Products)
8. **Users ↔ Contact Replies**: Referenced (repliedBy in Contact)

## Data Validation

- Email format validation
- Password strength requirements
- Price must be positive
- Stock cannot be negative
- Rating must be between 1-5
- Required fields validation
- Enum value validation
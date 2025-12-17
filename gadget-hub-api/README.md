# Gadget Hub API

Complete backend API for Gadget Hub e-commerce platform with MongoDB and role-based access control.

## Features

- **Authentication & Authorization** (JWT + Role-based)
- **User Management** (CRUD operations)
- **Product Management** (CRUD operations)
- **Cart & Wishlist** (Full functionality)
- **Order Management** (Complete order lifecycle)
- **Admin Dashboard** (Statistics and management)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/profile` - Get user profile (auth required)
- `PUT /api/users/profile` - Update user profile (auth required)
- `GET /api/users` - Get all users (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)
- `PUT /api/users/:id/role` - Update user role (admin only)

### Products
- `GET /api/products` - Get all active products (public)
- `GET /api/products/:id` - Get product by ID (public)
- `GET /api/products/admin/all` - Get all products (admin only)
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)
- `PATCH /api/products/:id/toggle-status` - Toggle product status (admin only)

### Cart & Wishlist
- `GET /api/cart` - Get user cart and wishlist (auth required)
- `POST /api/cart/add` - Add item to cart (auth required)
- `POST /api/cart/remove` - Remove item from cart (auth required)
- `POST /api/cart/checkout` - Checkout cart (auth required)

### Orders
- `GET /api/orders/my-orders` - Get user orders (auth required)
- `GET /api/orders` - Get all orders (admin only)
- `GET /api/orders/:orderId` - Get order by ID (auth required)
- `PUT /api/orders/:orderId/status` - Update order status (admin only)

### Admin Dashboard
- `GET /api/admin/stats` - Get dashboard statistics (admin only)
- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/orders` - Get all orders (admin only)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start MongoDB service

3. Create `.env` file with:
   ```
   JWT_SECRET=your_secret_key
   MONGODB_URI=mongodb://localhost:27017/gadgethub
   PORT=5002
   ```

4. Start server:
   ```bash
   npm start
   ```

## Usage

Server runs on `http://localhost:5002`

### Create Admin User
```bash
POST /api/auth/register
{
  "name": "Admin User",
  "email": "admin@gadgethub.com",
  "password": "admin123",
  "role": "admin"
}
```

### Test API
Visit `http://localhost:5002` for API documentation.

## Database Models

### User
- name, email, password
- role (user/admin)
- cart, wishlist, orders

### Product
- name, category, price, image
- description, stock, isActive

## Security Features

- JWT Authentication
- Role-based Access Control
- Password Hashing (bcrypt)
- Input Validation
- CORS Protection
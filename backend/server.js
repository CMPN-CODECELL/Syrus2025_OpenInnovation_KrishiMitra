require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Authentication Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Product Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Category Routes
const categoryRoutes = require('./routes/categoryRoutes');
app.use('/api/categories', categoryRoutes);

// User Routes (cart, wishlist, profile)
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Order Routes
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

// Pricing Routes - it will show the pricing dynamically
const pricingRoutes = require('./routes/pricingRoutes');
app.use('/api/pricing', pricingRoutes);

const protectedRoutes = require('./routes/protectedRoutes');
app.use('/api/protected', protectedRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Load sample data in development mode
if (process.env.NODE_ENV === 'development') {
  const seedData = require('./utils/seedData');
  seedData().catch(err => console.log(err));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
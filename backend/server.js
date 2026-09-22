const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
app.use(cors({
  origin: ['http://localhost:3000', 'https://mawolangalan-bites.vercel.app', 'https://mawolangalan-bites-l6tz.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mawolangalan';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB Connected: ' + mongoose.connection.host);
})
.catch((err) => {
  console.error('❌ Error: ' + err.message);
  process.exit(1);
});

// Routes
app.get('/api', (req, res) => {
  res.json({ message: 'Mawolangalan Bites API is running!' });
});

// Product Routes
try {
  const productRoutes = require('./routes/productRoutes');
  app.use('/api/products', productRoutes);
} catch (error) {
  console.log('⚠️  Product routes not loaded:', error.message);
}

// Order Routes
try {
  const orderRoutes = require('./routes/orderRoutes');
  app.use('/api/orders', orderRoutes);
} catch (error) {
  console.log('⚠️  Order routes not loaded:', error.message);
}

// Contact Routes
try {
  const contactRoutes = require('./routes/contactRoutes');
  app.use('/api/contact', contactRoutes);
} catch (error) {
  console.log('️  Contact routes not loaded:', error.message);
}

// Payment Routes (M-Pesa)
try {
  const paymentRoutes = require('./routes/paymentRoutes');
  app.use('/api/payments', paymentRoutes);
} catch (error) {
  console.log('⚠️  Payment routes not loaded:', error.message);
}

// ✅ NEW: Dynamic Stats Endpoint
app.get('/api/stats', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    
    // Count total orders (Happy Customers) and total products
    const customerCount = await db.collection('orders').countDocuments();
    const productCount = await db.collection('products').countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        // Fallback to 500 and 50 if the database is brand new and empty
        customers: Math.max(500, customerCount), 
        products: Math.max(50, productCount),    
        fresh: "100%" 
      }
    });
  } catch (error) {
    // Fallback data if database query fails
    res.status(200).json({
      success: true,
      stats: { customers: 500, products: 50, fresh: "100%" }
    });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: err.message 
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(` API available at http://localhost:${PORT}/api`);
});

module.exports = app;
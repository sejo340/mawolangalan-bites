const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration - FIXED to allow Vercel
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
  console.error(' Error: ' + err.message);
  process.exit(1);
});

// Routes
app.get('/api', (req, res) => {
  res.json({ message: 'Mawolangalan Bites API is running!' });
});

// Product Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Order Routes
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

// Contact Routes
const contactRoutes = require('./routes/contactRoutes');
app.use('/api/contact', contactRoutes);

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
  console.log(`📍 API available at http://localhost:${PORT}/api`);
});

module.exports = app;
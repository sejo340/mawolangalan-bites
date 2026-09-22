const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Simple Admin Password (You can change this later!)
const ADMIN_PASSWORD = "mawolangalan2024"; 

// 1. Admin Login Route
router.post('/login', (req, res) => {
  if (req.body.password === ADMIN_PASSWORD) {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid password" });
  }
});

// 2. Get All Orders (For Event Tracking & Dashboard)
router.get('/orders', async (req, res) => {
  try {
    // Use a flexible schema to fetch existing orders
    const Order = mongoose.models.Order || mongoose.model('Order', new mongoose.Schema({}, { strict: false }));
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
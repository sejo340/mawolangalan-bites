const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  category: { type: String, default: 'cookies' },
  image: { type: String, default: '' },
  stock: { type: Number, default: 10 },
  weight: { type: String, default: '1 piece' }
}, { timestamps: true });

// Prevent OverwriteModelError in development
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST new product (Fixes Item 10: Persists on reload)
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json({ success: true, product: savedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Simple Order Schema (in case you don't have a separate model file)
const orderSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  items: [{
    productId: String,
    name: String,
    price: Number,
    quantity: Number
  }],
  total: { type: Number, required: true },
  deliveryFee: { type: Number, default: 0 },
  location: {
    lat: Number,
    lng: Number,
    distance: String
  },
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

// POST /api/orders
router.post('/', async (req, res) => {
  try {
    console.log("Received order request:", req.body);
    
    const newOrder = new Order({
      fullName: req.body.fullName,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      paymentMethod: req.body.paymentMethod,
      items: req.body.items.map(item => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      total: req.body.total,
      deliveryFee: req.body.deliveryFee || 0,
      location: req.body.location || null
    });

    const savedOrder = await newOrder.save();
    console.log("Order saved successfully:", savedOrder._id);
    
    res.status(201).json({ 
      success: true, 
      message: 'Order placed successfully',
      orderId: savedOrder._id 
    });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to place order',
      error: error.message 
    });
  }
});

// GET /api/orders (Optional: for you to view orders later)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
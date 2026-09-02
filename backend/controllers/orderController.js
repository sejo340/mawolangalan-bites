const Order = require('../models/Order');
const Product = require('../models/Product');

// Helper function to calculate distance between two coordinates (Haversine formula)
const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return d;
};

// Calculate Delivery Fee
const calculateDeliveryFee = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    // ⚠️ IMPORTANT: Change these coordinates to your actual bakery location in Nairobi!
    // (You can get these by right-clicking your location on Google Maps and copying the numbers)
    const BAKERY_LAT = -1.286389; 
    const BAKERY_LON = 36.817223; 

    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Location coordinates are required' });
    }

    const distance = getDistanceFromLatLonInKm(BAKERY_LAT, BAKERY_LON, latitude, longitude);
    
    // Delivery Fee Logic: Base fee KES 100 + KES 50 per km
    let fee = 100 + (distance * 50);
    
    // Cap the maximum delivery fee at KES 500 (optional, you can remove this if you want)
    if (fee > 500) fee = 500; 

    res.status(200).json({ 
      success: true, 
      distance: distance.toFixed(2), 
      deliveryFee: Math.round(fee) 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create Order
const createOrder = async (req, res) => {
  try {
    const { customerName, customerPhone, customerEmail, deliveryAddress, items, totalAmount, paymentMethod, deliveryDate, specialInstructions, latitude, longitude, deliveryFee } = req.body;

    let calculatedTotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product || !product.isAvailable) {
        return res.status(400).json({ error: `Product ${item.name} is not available` });
      }

      const itemTotal = product.price * item.quantity;
      calculatedTotal += itemTotal;
      orderItems.push({ product: product._id, name: product.name, quantity: item.quantity, price: product.price });
      
      product.stock -= item.quantity;
      await product.save();
    }

    if (Math.abs(calculatedTotal - (totalAmount - (deliveryFee || 0))) > 0.01) {
      return res.status(400).json({ error: 'Total amount mismatch' });
    }

    const order = new Order({
      customerName, customerPhone, customerEmail, deliveryAddress,
      items: orderItems, totalAmount, paymentMethod, deliveryDate, specialInstructions,
      location: { latitude, longitude },
      deliveryFee: deliveryFee || 0
    });

    await order.save();
    res.status(201).json({ success: true, message: 'Order created', orderId: order._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.product').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Order
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Order Status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus }, { new: true, runValidators: true });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.status(200).json({ success: true, message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { 
  createOrder, 
  getAllOrders, 
  getOrder, 
  updateOrderStatus, 
  calculateDeliveryFee 
};
const express = require('express');
const router = express.Router();
const { 
  createOrder, 
  getAllOrders, 
  getOrder, 
  updateOrderStatus, 
  calculateDeliveryFee 
} = require('../controllers/orderController');

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrder);
router.put('/:id', updateOrderStatus);

// Add the new route for calculating delivery fee
router.post('/calculate-delivery', calculateDeliveryFee); 

module.exports = router;
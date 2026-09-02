const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true, trim: true },
  customerPhone: { type: String, required: true },
  customerEmail: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    quantity: Number,
    price: Number
  }],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['mpesa', 'cod'], required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  mpesaReceiptNumber: { type: String },
  mpesaResponse: { type: Object },
  orderStatus: { 
    type: String, 
    enum: ['processing', 'baking', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'processing'
  },
  deliveryDate: { type: Date },
  specialInstructions: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
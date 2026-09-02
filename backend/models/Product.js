const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['cookies', 'cakes', 'pastries', 'brownies', 'bread']
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  weight: {
    type: String,
    default: '1 piece'
  },
  ingredients: [{
    type: String
  }],
  dietaryInfo: {
    vegan: { type: Boolean, default: false },
    glutenFree: { type: Boolean, default: false },
    sugarFree: { type: Boolean, default: false }
  },
  stock: {
    type: Number,
    required: true,
    default: 10
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
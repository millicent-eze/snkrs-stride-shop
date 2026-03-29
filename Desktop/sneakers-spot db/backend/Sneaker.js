const mongoose = require('mongoose');

// This defines the shape of a sneaker document in MongoDB
const sneakerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Sneaker name is required'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    size: {
      type: Number,
      required: [true, 'Size is required'],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/300x200?text=Sneaker',
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model('Sneaker', sneakerSchema);

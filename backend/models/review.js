const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  business: {
    type: mongoose.Schema.ObjectId,
    ref: 'Business',
    // required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    // required: [true, 'Please enter your comment'],
    default: '',
    maxLength: [500, 'Comment cannot exceed 500 characters']
  },
  images: [{
    public_id: {
      type: String,
      // required: true
    },
    url: {
      type: String,
      // required: true
    }
  }],
  helpful: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent multiple reviews from same user for same business
reviewSchema.index({ business: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema); 
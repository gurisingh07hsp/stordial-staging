const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: [true, 'Please enter your description'],
  },
  content: {
    type: String,
  },
  category: {
    type: String,
    required: true,
    enum: ['Business Trends', 'SEO', 'Customer Service', 'Marketing', 'Technology']
  },
  status: {
    type: String,
    required: true,
    enum: ['Draft', 'Published', 'Archived']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Blog', blogSchema); 
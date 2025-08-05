const express = require('express');
const router = express.Router();

// Get all categories
router.get('/', (req, res) => {
  const categories = [
    'Restaurants',
    'Retail',
    'Services',
    'Healthcare',
    'Entertainment',
    'Beauty',
    'Fitness',
    'Education',
    'Hotels',
    'Automotive',
    'Real Estate',
    'Technology',
    'Other'
  ];

  res.status(200).json({
    success: true,
    categories
  });
});

module.exports = router; 
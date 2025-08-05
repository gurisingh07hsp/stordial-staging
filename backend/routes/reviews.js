const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');

// Placeholder for review routes
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Reviews API - Coming soon'
  });
});

module.exports = router; 
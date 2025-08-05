const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');

// Get user profile
router.get('/profile', isAuthenticated, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
});

module.exports = router; 
const express = require('express');
const router = express.Router();
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');

// Admin dashboard stats
router.get('/stats', isAuthenticated, authorizeRoles('admin'), async (req, res) => {
  try {
    const User = require('../models/user');
    const Business = require('../models/business');

    const totalUsers = await User.countDocuments();
    const totalBusinesses = await Business.countDocuments();
    const featuredBusinesses = await Business.countDocuments({ featured: true });
    const verifiedBusinesses = await Business.countDocuments({ verified: true });

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalBusinesses,
        featuredBusinesses,
        verifiedBusinesses
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router; 
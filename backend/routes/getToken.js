const express = require('express');
const router = express.Router();

// Get user token
router.get('/', (req, res) => {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Please login to access this resource'
      });
    }
  res.status(200).json({
    success: true,
    token: token
  });
});

module.exports = router;
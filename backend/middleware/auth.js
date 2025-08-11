const jwt = require('jsonwebtoken');
const User = require('../models/user');

const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      next();
      
    }
    else{
      return res.status(401).json({
        success: false,
        message: 'Please login to access this resource'
      });
    }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role (${req.user.role}) is not allowed to access this resource`
      });
    }
    next();
  };
};

module.exports = { isAuthenticated, authorizeRoles }; 
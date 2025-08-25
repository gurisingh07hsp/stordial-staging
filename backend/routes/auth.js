const express = require('express');
const router = express.Router();
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');
const {
  registerUser,
  loginUser,
  logout,
  getUserProfile,
  updateProfile,
  allUsers,
  getUserDetails,
  updateUserRole,
  deleteUser,
  isAdmin,
  changePassword
} = require('../controllers/authController');

// router.route('/register').post(registerUser);
router.post('/register', registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/me').get(isAuthenticated, getUserProfile);
router.route('/me/update').put(isAuthenticated, updateProfile);
router.route('/changepassword').put(isAuthenticated, changePassword)

// Admin routes
router.route('/admin/users').get(isAuthenticated, authorizeRoles('admin'), allUsers);
router.route('/admin/isadmin').get(isAdmin);
router.route('/admin/user/:id')
  .get(isAuthenticated, authorizeRoles('admin'), getUserDetails)
  .put(isAuthenticated, authorizeRoles('admin'), updateUserRole)
  .delete(isAuthenticated, authorizeRoles('admin'), deleteUser);

module.exports = router; 
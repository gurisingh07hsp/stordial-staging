const express = require('express');
const router = express.Router();
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');
const {
  createBusiness,
  getBusinesses,
  getBusiness,
  getBusinessByName,
  updateBusiness,
  deleteBusiness,
  getFeaturedBusinesses,
  getBusinessesByCategoryAndLocation,
  toggleFeatured,
  toggleVerified
} = require('../controllers/businessController');

// Public routes
router.route('/').get(getBusinesses);
router.route('/featured').get(getFeaturedBusinesses);
router.route('/location/:location/category/:category').get(getBusinessesByCategoryAndLocation);
router.route('/:id').get(getBusiness);
router.route('/location/:location/category/:category/name/:name').get(getBusinessByName);

// Protected routes
router.route('/new').post(isAuthenticated, createBusiness);
router.route('/:id')
  .put(isAuthenticated, updateBusiness)
  .delete(isAuthenticated, deleteBusiness);

// Admin routes
router.route('/admin/featured/:id').put(isAuthenticated, authorizeRoles('admin'), toggleFeatured);
router.route('/admin/verified/:id').put(isAuthenticated, authorizeRoles('admin'), toggleVerified);

module.exports = router; 
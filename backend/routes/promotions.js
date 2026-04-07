const express = require('express');
const router = express.Router();
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');
const { createPayment } = require('../controllers/promotionController');

router.route('/').post(isAuthenticated, createPayment);

module.exports = router;
const express = require('express');
const router = express.Router();
const { isAuthenticated} = require('../middleware/auth');
const { createPayment, createOrder, verifyPayment, unpromoteBusiness } = require('../controllers/promotionController');

router.route('/').post(isAuthenticated, createPayment);
router.route('/payment/create-order').post(isAuthenticated, createOrder);
router.route('/payment/verify').post(isAuthenticated, verifyPayment);
router.route('/:id').put(isAuthenticated, unpromoteBusiness);

module.exports = router;
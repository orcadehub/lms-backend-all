const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { auth } = require('../middleware/auth');

// Initiate a payment session (authenticated students only)
router.post('/initiate', auth, paymentController.initiatePayment);

// Check transaction status (authenticated students only)
router.get('/check-status/:transactionId', auth, paymentController.checkPaymentStatus);

// Get subscription history (authenticated students only)
router.get('/history', auth, paymentController.getPaymentHistory);

// Server-to-Server webhook callback (publicly accessible by PhonePe PG)
router.post('/callback', paymentController.paymentCallback);

module.exports = router;

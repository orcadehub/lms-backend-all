const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const FFPayment = require('../models/FFPayment');
const auth = require('../middleware/auth');
const { StandardCheckoutClient, Env, StandardCheckoutPayRequest } = require('@phonepe-pg/pg-sdk-node');

const PHONEPE_MID = process.env.PHONEPE_MID;
const SALT_KEY = process.env.PHONEPE_SALT_KEY;
const SALT_INDEX = process.env.PHONEPE_SALT_INDEX || 1;

// Base URL for PhonePe Production
const PHONEPE_BASE_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";

// Create PhonePe Payment Request
router.post('/recharge', auth, async (req, res) => {
    const { amount } = req.body;
    if (!amount || amount < 100) {
        return res.status(400).json({ error: 'Minimum recharge is ₹100' });
    }

    if (!PHONEPE_MID || !SALT_KEY) {
        return res.status(500).json({ error: 'PhonePe Gateway not configured' });
    }

    const merchantTransactionId = `MT${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const userId = req.user._id;

    // Build the payload
    const payload = {
        merchantId: PHONEPE_MID,
        merchantTransactionId: merchantTransactionId,
        merchantUserId: `U${userId}`,
        amount: amount * 100, // paise
        redirectUrl: `${process.env.FRONTEND_URL}/payment-status?id=${merchantTransactionId}`,
        redirectMode: "REDIRECT",
        callbackUrl: `${process.env.BACKEND_URL || 'https://backend.orcode.in'}/api/ff/payments/webhook`,
        paymentInstrument: {
            type: "PAY_PAGE"
        }
    };

    try {
        const base64Str = Buffer.from(JSON.stringify(payload)).toString("base64");
        const signStr = base64Str + "/pg/v1/pay" + SALT_KEY;
        const checksum = crypto.createHash("sha256").update(signStr).digest("hex") + "###" + SALT_INDEX;

        const axios = require('axios');
        const response = await axios.post(PHONEPE_BASE_URL, {
            request: base64Str
        }, {
            headers: {
                "Content-Type": "application/json",
                "X-VERIFY": checksum
            }
        });

        if (response.data.success && response.data.data.instrumentResponse.redirectInfo.url) {
            await new FFPayment({
                user: req.user._id,
                gatewayOrderId: response.data.data.merchantTransactionId,
                merchantTransactionId: merchantTransactionId,
                amount: amount,
                gateway: 'PhonePe',
                status: 'Created'
            }).save();

            res.json({
                success: true,
                redirectUrl: response.data.data.instrumentResponse.redirectInfo.url
            });
        } else {
            res.status(500).json({ error: 'PhonePe initialization failed', details: response.data.message });
        }
    } catch (err) {
        console.error('PhonePe Error:', err.response?.data || err.message);
        res.status(500).json({ 
            error: 'Failed to initiate payment', 
            details: err.response?.data?.message || err.message 
        });
    }
});

// Verify Payment Status (Frontend calls this after redirect)
router.post('/verify', auth, async (req, res) => {
    const { merchantTransactionId } = req.body;
    if (!merchantTransactionId) return res.status(400).json({ error: 'Missing Transaction ID' });

    try {
        // Build Verification URL
        const signStr = `/pg/v1/status/${PHONEPE_MID}/${merchantTransactionId}${SALT_KEY}`;
        const checksum = crypto.createHash("sha256").update(signStr).digest("hex") + "###" + SALT_INDEX;

        const axios = require('axios');
        const response = await axios.get(`https://api.phonepe.com/apis/hermes/pg/v1/status/${PHONEPE_MID}/${merchantTransactionId}`, {
            headers: {
                "Content-Type": "application/json",
                "X-VERIFY": checksum,
                "X-MERCHANT-ID": PHONEPE_MID
            }
        });

        // SDK returns the state (e.g. COMPLETED, PENDING, FAILED)
        if (response.data.success && response.data.code === "PAYMENT_SUCCESS") {
            // Atomic update to prevent race conditions from duplicate verify calls (e.g. React Strict Mode)
            const payment = await FFPayment.findOneAndUpdate(
                { merchantTransactionId, status: { $ne: 'Success' } },
                { status: 'Success', gatewayPaymentId: response.data.data.transactionId || merchantTransactionId },
                { new: false } // Returns the document state BEFORE the update
            );

            if (payment) {
                // Payment was just updated to Success, proced to update wallet
                const FFUser = require('../models/FFUser');
                
                // Atomically update balance
                const updatedUser = await FFUser.findByIdAndUpdate(
                    payment.user,
                    { $inc: { walletBalance: payment.amount } },
                    { new: true }
                );

                const FFTransaction = require('../models/FFTransaction');
                await new FFTransaction({
                    user: payment.user,
                    type: 'CREDIT',
                    amount: payment.amount,
                    description: 'Wallet Recharge (PhonePe)',
                    referenceId: payment._id,
                    status: 'Success'
                }).save();

                return res.json({ success: true, walletBalance: updatedUser.walletBalance });
            }
            // If payment is null, it was either already 'Success' or didn't exist. Safely ignore.
            return res.json({ success: true, alreadyProcessed: true });
        } else {
            console.log('Payment Not Success:', response.data);
            res.status(400).json({ error: 'Payment failed or pending', details: response.data.message });
        }
    } catch (err) {
        console.error('PhonePe Status Error:', err.response?.data || err.message);
        res.status(500).json({ error: 'Verification error', details: err.response?.data?.message || err.message });
    }
});

// Transactions route stays the same
router.get('/transactions', auth, async (req, res) => {
    try {
        const FFTransaction = require('../models/FFTransaction');
        const transactions = await FFTransaction.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .limit(50);
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: 'Failed' });
    }
});

module.exports = router;

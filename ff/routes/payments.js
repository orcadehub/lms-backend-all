const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const FFPayment = require('../models/FFPayment');
const auth = require('../middleware/auth');
const { StandardCheckoutClient, Env, StandardCheckoutPayRequest } = require('@phonepe-pg/pg-sdk-node');

const PHONEPE_CLIENT_ID = process.env.PHONEPE_MID;
const PHONEPE_CLIENT_SECRET = process.env.PHONEPE_SALT_KEY;
const clientVersion = 1;

// Determine environment 
const isSandbox = process.env.PHONEPE_UAT_URL?.includes('sandbox') || 
                  PHONEPE_CLIENT_ID?.includes('_') || 
                  PHONEPE_CLIENT_ID === 'PGTESTPAYUAT';

const currentEnv = isSandbox ? Env.SANDBOX : Env.PRODUCTION;

let phonepeClient;
try {
    if (PHONEPE_CLIENT_ID && PHONEPE_CLIENT_SECRET) {
        phonepeClient = StandardCheckoutClient.getInstance(
            PHONEPE_CLIENT_ID, 
            PHONEPE_CLIENT_SECRET, 
            clientVersion, 
            currentEnv
        );
        console.log(`PhonePe initialized in ${currentEnv} mode`);
    }
} catch (err) {
    console.error("Failed to initialize PhonePe SDK", err);
}

// Create PhonePe Payment Request
router.post('/recharge', auth, async (req, res) => {
    const { amount } = req.body;
    if (!amount || amount < 100) {
        return res.status(400).json({ error: 'Minimum recharge is ₹100' });
    }

    if (!phonepeClient) return res.status(500).json({ error: 'PhonePe Gateway not configured' });

    const merchantTransactionId = `MT${Date.now()}${Math.floor(Math.random() * 1000)}`;

    try {
        const request = StandardCheckoutPayRequest.builder()
            .merchantOrderId(merchantTransactionId)
            .amount(amount * 100) // SDK expects paise
            .redirectUrl(`${process.env.FRONTEND_URL}/payment-status?id=${merchantTransactionId}`)
            .build();

        const response = await phonepeClient.pay(request);

        if (response && response.redirectUrl) {
            await new FFPayment({
                user: req.user._id,
                gatewayOrderId: merchantTransactionId,
                merchantTransactionId: merchantTransactionId,
                amount: amount,
                gateway: 'PhonePe',
                status: 'Created'
            }).save();

            res.json({
                success: true,
                redirectUrl: response.redirectUrl
            });
        } else {
            res.status(500).json({ error: 'PhonePe initialization failed' });
        }
    } catch (err) {
        console.error('PhonePe Error:', err.message || err);
        res.status(500).json({ error: 'Failed to initiate payment', details: err.message });
    }
});

// Verify Payment Status (Frontend calls this after redirect)
router.post('/verify', auth, async (req, res) => {
    const { merchantTransactionId } = req.body;
    if (!merchantTransactionId) return res.status(400).json({ error: 'Missing Transaction ID' });
    if (!phonepeClient) return res.status(500).json({ error: 'PhonePe Gateway not configured' });

    try {
        const response = await phonepeClient.getOrderStatus(merchantTransactionId);
        
        // SDK returns the state (e.g. COMPLETED, PENDING, FAILED)
        if (response && response.state === "COMPLETED") {
            // Atomic update to prevent race conditions from duplicate verify calls (e.g. React Strict Mode)
            const payment = await FFPayment.findOneAndUpdate(
                { merchantTransactionId, status: { $ne: 'Success' } },
                { status: 'Success', gatewayPaymentId: response.transactionId || merchantTransactionId },
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
            res.status(400).json({ error: 'Payment failed or pending' });
        }
    } catch (err) {
        console.error('PhonePe Status Error:', err.message || err);
        res.status(500).json({ error: 'Verification error', details: err.message });
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

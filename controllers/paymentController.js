const axios = require('axios');
const Student = require('../models/Student');
const SiteConfig = require('../models/SiteConfig');
const Payment = require('../models/Payment');

// PhonePe Checkout V2 credentials from env
const PHONEPE_CLIENT_ID = process.env.PHONEPE_CLIENT_ID || 'SU2505131803078818264199';
const PHONEPE_CLIENT_SECRET = process.env.PHONEPE_CLIENT_SECRET || 'c9c82e85-24be-4d0a-941b-c9769f518f64';
const PHONEPE_CLIENT_VERSION = process.env.PHONEPE_CLIENT_VERSION || '1';

// PhonePe API endpoints (Production)
const TOKEN_URL = 'https://api.phonepe.com/apis/identity-manager/v1/oauth/token';
const CHECKOUT_URL = 'https://api.phonepe.com/apis/pg/checkout/v2/pay';
const STATUS_URL = 'https://api.phonepe.com/apis/pg/checkout/v2/order'; // GET /order/{orderId}/status

// Token cache to avoid fetching a new token for every request
let cachedToken = null;
let tokenExpiresAt = 0;

/**
 * Gets a valid OAuth access token, using cache when possible
 */
async function getAccessToken() {
  // Return cached token if still valid (with 60s buffer)
  if (cachedToken && Date.now() < (tokenExpiresAt - 60000)) {
    return cachedToken;
  }

  const response = await axios.post(
    TOKEN_URL,
    new URLSearchParams({
      client_id: PHONEPE_CLIENT_ID,
      client_secret: PHONEPE_CLIENT_SECRET,
      client_version: PHONEPE_CLIENT_VERSION,
      grant_type: 'client_credentials'
    }).toString(),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
  );

  cachedToken = response.data.access_token;
  tokenExpiresAt = response.data.expires_at * 1000; // convert to ms
  console.log('PhonePe OAuth token refreshed, expires at:', new Date(tokenExpiresAt).toISOString());
  return cachedToken;
}

/**
 * Initiates a PhonePe Checkout V2 payment session for Rs 20
 */
exports.initiatePayment = async (req, res) => {
  try {
    const studentId = req.userId || req.user?.id || req.user?._id || req.body.studentId;
    if (!studentId) {
      return res.status(400).json({ message: 'Authentication required' });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    // Get OAuth token
    const accessToken = await getAccessToken();

    const merchantOrderId = `ORD_${Date.now()}_${studentId.toString().slice(-6)}`;
    
    // Fetch dynamic subscription amount from SiteConfig
    const siteConfig = await SiteConfig.getConfig();
    
    // If free access is enabled, no payment needed
    if (siteConfig.isFreeAccess || siteConfig.subscriptionAmount === 0) {
      // Directly activate subscription
      const activeUntil = new Date();
      activeUntil.setDate(activeUntil.getDate() + 30);
      await Student.findByIdAndUpdate(studentId, {
        isSubscribed: true,
        subscriptionActiveUntil: activeUntil,
        subscriptionType: 'free'
      });
      // Create free payment history entry
      await Payment.create({
        student: studentId,
        merchantOrderId,
        amount: 0,
        status: 'SUCCESS',
        type: 'free'
      });
      return res.status(200).json({
        success: true,
        freeAccess: true,
        message: 'Free subscription activated for 30 days'
      });
    }

    const amount = siteConfig.subscriptionAmount; // Amount in paise from config
    const amountInRupees = amount / 100;

    const frontendUrl = req.body.frontendUrl || process.env.FRONTEND_URL || 'https://orcadehub.com';

    // Checkout V2 payload
    const payload = {
      merchantOrderId: merchantOrderId,
      amount: amount,
      expireAfter: 1200, // 20 minutes
      metaInfo: {
        udf1: studentId.toString(),
        udf2: 'subscription_monthly'
      },
      paymentFlow: {
        type: 'PG_CHECKOUT',
        message: `OrcadeHub Monthly Subscription - ₹${amountInRupees}`
      },
      merchantUrls: {
        redirectUrl: `${frontendUrl}/payment/status?orderId=${merchantOrderId}`,
        callbackUrl: `https://backend.orcadehub.com/api/payments/callback`
      }
    };
    // Create pending payment log
    await Payment.create({
      student: studentId,
      merchantOrderId,
      amount,
      status: 'PENDING',
      type: 'paid'
    });
    const response = await axios.post(
      CHECKOUT_URL,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `O-Bearer ${accessToken}`
        }
      }
    );

    if (response.data && response.data.orderId && response.data.redirectUrl) {
      return res.status(200).json({
        success: true,
        redirectUrl: response.data.redirectUrl,
        orderId: response.data.orderId,
        merchantOrderId: merchantOrderId,
        state: response.data.state
      });
    } else {
      console.error('PhonePe Checkout V2 response error:', response.data);
      return res.status(500).json({ message: 'Failed to initiate payment with gateway' });
    }
  } catch (error) {
    console.error('PhonePe Payment Initiation Error:', error.response?.data || error.message);
    res.status(500).json({ 
      message: 'Server error during payment initialization', 
      error: error.response?.data || error.message 
    });
  }
};

/**
 * Checks order status with PhonePe Checkout V2 and updates student subscription upon success
 */
exports.checkPaymentStatus = async (req, res) => {
  try {
    const { transactionId } = req.params; // This will be the merchantOrderId
    const studentId = req.userId || req.user?.id || req.user?._id;

    if (!transactionId) {
      return res.status(400).json({ message: 'Order ID is required' });
    }

    // Get OAuth token
    const accessToken = await getAccessToken();

    const response = await axios.get(
      `${STATUS_URL}/${transactionId}/status`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `O-Bearer ${accessToken}`
        }
      }
    );

    const orderData = response.data;

    if (orderData && orderData.state === 'COMPLETED') {
      // Extract studentId from metaInfo or use logged-in user
      const userId = orderData.metaInfo?.udf1 || studentId;
      
      if (!userId) {
        return res.status(400).json({ message: 'User mapping missing from payment data' });
      }

      // Activate subscription: 30 days from now
      const activeUntil = new Date();
      activeUntil.setDate(activeUntil.getDate() + 30);

      const updatedStudent = await Student.findByIdAndUpdate(
        userId,
        {
          isSubscribed: true,
          subscriptionActiveUntil: activeUntil,
          subscriptionType: 'paid'
        },
        { new: true }
      );

      // Update payment record to success
      await Payment.findOneAndUpdate(
        { merchantOrderId: transactionId },
        { status: 'SUCCESS' }
      );

      return res.status(200).json({
        success: true,
        code: 'PAYMENT_SUCCESS',
        message: 'Subscription successfully activated for 30 days',
        student: {
          id: updatedStudent?._id,
          name: updatedStudent?.name,
          email: updatedStudent?.email,
          isSubscribed: updatedStudent?.isSubscribed,
          subscriptionActiveUntil: updatedStudent?.subscriptionActiveUntil,
          subscriptionType: updatedStudent?.subscriptionType
        }
      });
    } else if (orderData && orderData.state === 'FAILED') {
      // Update payment record to failed
      await Payment.findOneAndUpdate(
        { merchantOrderId: transactionId },
        { status: 'FAILED' }
      );

      return res.status(200).json({
        success: false,
        code: 'PAYMENT_FAILED',
        message: orderData.errorContext?.description || 'Payment failed'
      });
    } else {
      return res.status(200).json({
        success: false,
        code: 'PAYMENT_PENDING',
        message: 'Payment is still being processed',
        state: orderData?.state
      });
    }
  } catch (error) {
    console.error('PhonePe Check Status Error:', error.response?.data || error.message);
    res.status(500).json({ 
      message: 'Server error during payment status verification', 
      error: error.response?.data || error.message 
    });
  }
};

/**
 * Server-to-Server Webhook callback from PhonePe (Checkout V2 format)
 */
exports.paymentCallback = async (req, res) => {
  try {
    const callbackData = req.body;
    
    console.log('PhonePe Webhook received:', JSON.stringify(callbackData));

    // Checkout V2 callback sends event type and payload directly
    if (!callbackData || !callbackData.type) {
      // Fallback: try legacy base64 response format
      const { response } = req.body;
      if (response) {
        const decodedPayload = JSON.parse(Buffer.from(response, 'base64').toString('utf-8'));
        if (decodedPayload.success && decodedPayload.code === 'PAYMENT_SUCCESS') {
          const studentId = decodedPayload.data.merchantUserId;
          const activeUntil = new Date();
          activeUntil.setDate(activeUntil.getDate() + 30);
          await Student.findByIdAndUpdate(studentId, {
            isSubscribed: true,
            subscriptionActiveUntil: activeUntil,
            subscriptionType: 'paid'
          });
          const merchantOrderId = decodedPayload.data.merchantTransactionId || decodedPayload.data.merchantOrderId;
          if (merchantOrderId) {
            await Payment.findOneAndUpdate(
              { merchantOrderId },
              { status: 'SUCCESS' }
            );
          }
          console.log(`Payment Webhook (legacy): Activated subscription for ${studentId}`);
        }
        return res.status(200).send('OK');
      }
      return res.status(400).send('Invalid webhook request');
    }

    // Checkout V2 callback format
    if (callbackData.type === 'PG_ORDER_COMPLETED' || callbackData.state === 'COMPLETED') {
      const merchantOrderId = callbackData.merchantOrderId || callbackData.payload?.merchantOrderId;
      const studentId = callbackData.metaInfo?.udf1 || callbackData.payload?.metaInfo?.udf1;

      if (studentId) {
        const activeUntil = new Date();
        activeUntil.setDate(activeUntil.getDate() + 30);

        await Student.findByIdAndUpdate(studentId, {
          isSubscribed: true,
          subscriptionActiveUntil: activeUntil,
          subscriptionType: 'paid'
        });

        await Payment.findOneAndUpdate(
          { merchantOrderId },
          { status: 'SUCCESS' }
        );

        console.log(`Payment Webhook V2: Activated subscription for Student ${studentId}, Order: ${merchantOrderId}`);
      } else {
        console.warn('Webhook: No studentId found in metaInfo.udf1');
      }
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('PhonePe Webhook callback error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

/**
 * Get payment history for authenticated student
 */
exports.getPaymentHistory = async (req, res) => {
  try {
    const studentId = req.userId || req.user?.id || req.user?._id;
    if (!studentId) {
      return res.status(400).json({ message: 'Authentication required' });
    }
    const payments = await Payment.find({ student: studentId })
      .sort({ createdAt: -1 });
    res.status(200).json(payments);
  } catch (error) {
    console.error('Error fetching payment history:', error);
    res.status(500).json({ message: 'Server error fetching payment history' });
  }
};

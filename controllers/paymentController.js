const crypto = require('crypto');
const axios = require('axios');
const Student = require('../models/Student');

// Retrieve credentials from env variables
const PHONEPE_MID = process.env.PHONEPE_MID || 'SU2505131803078818264199';
const PHONEPE_SALT_KEY = process.env.PHONEPE_SALT_KEY || 'c9c82e85-24be-4d0a-941b-c9769f518f64';
const PHONEPE_SALT_INDEX = process.env.PHONEPE_SALT_INDEX || '1';

// Base API endpoints for PhonePe Production
const PHONEPE_API_URL = 'https://api.phonepe.com/apis/hermes';

/**
 * Initiates a PhonePe payment session for Rs 20
 */
exports.initiatePayment = async (req, res) => {
  try {
    const studentId = req.studentId || req.user?.studentId || req.body.studentId;
    if (!studentId) {
      return res.status(400).json({ message: 'Authentication required' });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    const merchantTransactionId = `TXN_${Date.now()}_${studentId.toString().substring(18)}`;
    
    // Amount is Rs 20 (2000 Paise)
    const amount = 2000; 

    // Construct Payload
    const payload = {
      merchantId: PHONEPE_MID,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: studentId.toString(),
      amount: amount,
      redirectUrl: `${process.env.FRONTEND_URL || 'https://orcadehub.com'}/payment/status?txnId=${merchantTransactionId}`,
      redirectMode: 'REDIRECT',
      callbackUrl: `https://backend.orcadehub.com/api/payments/callback`,
      mobileNumber: student.profile?.phone || '9999999999',
      paymentInstrument: {
        type: 'PAY_PAGE'
      }
    };

    // Encode to Base64
    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
    
    // Calculate Checksum Header
    const stringToHash = base64Payload + '/pg/v1/pay' + PHONEPE_SALT_KEY;
    const sha256Hash = crypto.createHash('sha256').update(stringToHash).digest('hex');
    const xVerifyHeader = `${sha256Hash}###${PHONEPE_SALT_INDEX}`;

    // Request to PhonePe API
    const response = await axios.post(
      `${PHONEPE_API_URL}/pg/v1/pay`,
      { request: base64Payload },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': xVerifyHeader,
          'accept': 'application/json'
        }
      }
    );

    if (response.data && response.data.success && response.data.data.instrumentResponse) {
      const redirectUrl = response.data.data.instrumentResponse.redirectInfo.url;
      return res.status(200).json({
        success: true,
        redirectUrl,
        transactionId: merchantTransactionId
      });
    } else {
      console.error('PhonePe PG response error:', response.data);
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
 * Checks transaction status with PhonePe and updates student subscription upon success
 */
exports.checkPaymentStatus = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const studentId = req.studentId || req.user?.studentId;

    if (!transactionId) {
      return res.status(400).json({ message: 'Transaction ID is required' });
    }

    // Verify signature to check transaction status with PhonePe API
    const stringToHash = `/pg/v1/status/${PHONEPE_MID}/${transactionId}${PHONEPE_SALT_KEY}`;
    const sha256Hash = crypto.createHash('sha256').update(stringToHash).digest('hex');
    const xVerifyHeader = `${sha256Hash}###${PHONEPE_SALT_INDEX}`;

    const response = await axios.get(
      `${PHONEPE_API_URL}/pg/v1/status/${PHONEPE_MID}/${transactionId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': xVerifyHeader,
          'X-MERCHANT-ID': PHONEPE_MID,
          'accept': 'application/json'
        }
      }
    );

    if (response.data && response.data.success && response.data.code === 'PAYMENT_SUCCESS') {
      // Find the student by merchantUserId or current logged in student
      const userId = response.data.data.merchantUserId || studentId;
      
      if (!userId) {
        return res.status(400).json({ message: 'User mapping missing from payment data' });
      }

      // Activate subscription: 30 days from now
      const activeUntil = new Date();
      activeUntil.setDate(activeUntil.getDate() + 30);

      const student = await Student.findByIdAndUpdate(
        userId,
        {
          isSubscribed: true,
          subscriptionActiveUntil: activeUntil
        },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        code: 'PAYMENT_SUCCESS',
        message: 'Subscription successfully activated for 30 days',
        student: {
          id: student?._id,
          name: student?.name,
          email: student?.email,
          isSubscribed: student?.isSubscribed,
          subscriptionActiveUntil: student?.subscriptionActiveUntil
        }
      });
    } else {
      return res.status(200).json({
        success: false,
        code: response.data?.code || 'PAYMENT_PENDING',
        message: response.data?.message || 'Payment is not fully completed yet'
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
 * Server-to-Server Webhook callback from PhonePe
 */
exports.paymentCallback = async (req, res) => {
  try {
    const { response } = req.body;
    if (!response) {
      return res.status(400).send('Invalid webhook request');
    }

    // Decode response payload
    const decodedPayload = JSON.parse(Buffer.from(response, 'base64').toString('utf-8'));
    
    if (decodedPayload.success && decodedPayload.code === 'PAYMENT_SUCCESS') {
      const studentId = decodedPayload.data.merchantUserId;
      
      const activeUntil = new Date();
      activeUntil.setDate(activeUntil.getDate() + 30);

      await Student.findByIdAndUpdate(studentId, {
        isSubscribed: true,
        subscriptionActiveUntil: activeUntil
      });
      
      console.log(`Payment Webhook: Activated subscription for Student ID: ${studentId}`);
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('PhonePe Webhook callback error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

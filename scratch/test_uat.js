const axios = require('axios');

const CLIENT_ID = 'SU2505131803078818264199';
const CLIENT_SECRET = 'c9c82e85-24be-4d0a-941b-c9769f518f64';
const CLIENT_VERSION = '1';

const UAT_TOKEN_URL = 'https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token';
const UAT_CHECKOUT_URL = 'https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/pay';

async function run() {
  console.log('Fetching OAuth token from UAT...');
  try {
    const res = await axios.post(UAT_TOKEN_URL, new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      client_version: CLIENT_VERSION,
      grant_type: 'client_credentials'
    }).toString(), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
    
    const token = res.data.access_token;
    console.log(`Success! Token: ${token.substring(0, 30)}...`);

    const orderId = `ORDER_${Date.now()}`;
    const payload = {
      merchantOrderId: orderId,
      amount: 2000,
      expireAfter: 1200,
      paymentFlow: {
        type: 'PG_CHECKOUT',
        message: 'OrcadeHub Subscription - Rs 20/month'
      },
      merchantUrls: {
        redirectUrl: `https://orcadehub.com/payment/status?orderId=${orderId}`,
        callbackUrl: 'https://backend.orcadehub.com/api/payments/callback'
      }
    };

    console.log('Initiating payment on UAT checkout...');
    const payRes = await axios.post(UAT_CHECKOUT_URL, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `O-Bearer ${token}`
      }
    });

    console.log('UAT Pay Success response:', JSON.stringify(payRes.data, null, 2));
  } catch (err) {
    console.log('Error:', err.response?.status, JSON.stringify(err.response?.data) || err.message);
  }
}

run();

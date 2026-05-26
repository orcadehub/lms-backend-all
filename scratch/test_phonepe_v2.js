const axios = require('axios');

const CLIENT_ID = 'SU2505131803078818264199';
const CLIENT_SECRET = 'c9c82e85-24be-4d0a-941b-c9769f518f64';
const CLIENT_VERSION = '1';

const TOKEN_URL = 'https://api.phonepe.com/apis/identity-manager/v1/oauth/token';

// Try multiple checkout endpoint variations
const CHECKOUT_URLS = [
  'https://api.phonepe.com/apis/pg/checkout/v2/pay',
  'https://api.phonepe.com/apis/pg/v1/checkout/pay',
  'https://api.phonepe.com/apis/hermes/pg/v1/pay',
  'https://api.phonepe.com/apis/pg-sandbox/checkout/v2/pay',
];

async function getToken() {
  const res = await axios.post(TOKEN_URL, new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    client_version: CLIENT_VERSION,
    grant_type: 'client_credentials'
  }).toString(), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
  return res.data.access_token;
}

async function testCheckout(url, token) {
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

  console.log(`\nTesting: ${url}`);
  try {
    const res = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `O-Bearer ${token}`
      }
    });
    console.log(`  ✅ SUCCESS:`, JSON.stringify(res.data, null, 2));
    return res.data;
  } catch (err) {
    console.log(`  ❌ ${err.response?.status}: ${JSON.stringify(err.response?.data)}`);
    return null;
  }
}

async function run() {
  console.log('Getting OAuth token...');
  const token = await getToken();
  console.log(`Token: ${token.substring(0, 30)}...`);

  for (const url of CHECKOUT_URLS) {
    const result = await testCheckout(url, token);
    if (result && (result.redirectUrl || result.data)) {
      console.log(`\n🎉 Working checkout endpoint: ${url}`);
      return;
    }
  }
  console.log('\n❌ No checkout endpoint worked.');
}

run();

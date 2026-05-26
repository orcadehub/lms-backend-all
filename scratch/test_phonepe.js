const crypto = require('crypto');
const axios = require('axios');

const PHONEPE_MID = 'SU2505131803078818264199';
const PHONEPE_SALT_KEY = 'c9c82e85-24be-4d0a-941b-c9769f518f64';

async function test(api_url, hash_path, salt_index) {
  const studentId = '658c2f5d9f8c6b3e8c9d1a2b';
  const merchantTransactionId = `TXN_${Date.now()}`;
  
  const payload = {
    merchantId: PHONEPE_MID,
    merchantTransactionId: merchantTransactionId,
    merchantUserId: studentId,
    amount: 2000, 
    redirectUrl: `https://orcadehub.com/payment/status?txnId=${merchantTransactionId}`,
    redirectMode: 'REDIRECT',
    callbackUrl: `https://backend.orcadehub.com/api/payments/callback`,
    mobileNumber: '9999999999',
    paymentInstrument: {
      type: 'PAY_PAGE'
    }
  };

  const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
  const stringToHash = base64Payload + hash_path + PHONEPE_SALT_KEY;
  const sha256Hash = crypto.createHash('sha256').update(stringToHash).digest('hex');
  const xVerifyHeader = `${sha256Hash}###${salt_index}`;

  console.log(`Testing URL: ${api_url} | Hash: ${hash_path} | Salt Index: ${salt_index}`);
  try {
    const response = await axios.post(
      api_url,
      { request: base64Payload },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': xVerifyHeader,
          'accept': 'application/json'
        }
      }
    );
    console.log(`SUCCESS:`, response.data);
  } catch (error) {
    if (error.response) {
      console.log(`ERROR: Status ${error.response.status} | Code: ${error.response.data?.code || 'none'} | Msg: ${error.response.data?.message || 'none'}`);
    } else {
      console.log('ERROR:', error.message);
    }
  }
}

async function run() {
  // Test combinations on production
  await test('https://api.phonepe.com/apis/hermes/pg/v1/pay', '/pg/v1/pay', '1');
  await test('https://api.phonepe.com/apis/hermes/pg/v1/pay', '/pg/v1/pay', '2');
  await test('https://api.phonepe.com/apis/hermes/pg/v1/pay', '/apis/hermes/pg/v1/pay', '1');
}

run();

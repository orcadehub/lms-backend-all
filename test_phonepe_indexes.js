const crypto = require('crypto');
const axios = require('axios');

const mid = "M227J0WSRVQHP_2604082155";
const salt = "MWE5OGRjNzUtOTRlYy00NTQwLWI1NTAtODk3YmZhMDRjZTQx";

const payload = {
    merchantId: mid,
    merchantTransactionId: "MT123456",
    merchantUserId: "U123",
    amount: 10000,
    redirectUrl: "http://localhost:5173/payment-status",
    redirectMode: "REDIRECT",
    mobileNumber: "9999999999",
    paymentInstrument: { type: "PAY_PAGE" }
};
const base64 = Buffer.from(JSON.stringify(payload)).toString('base64');

async function testIndex(index) {
    const hash = crypto.createHash('sha256').update(base64 + "/pg/v1/pay" + salt).digest('hex') + "###" + index;
    try {
        const res = await axios.post("https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay", { request: base64 }, {
            headers: { 'Content-Type': 'application/json', 'X-VERIFY': hash, 'accept': 'application/json', 'X-MERCHANT-ID': mid }
        });
        console.log(`Index ${index}: Success!`, res.data);
    } catch(err) {
        console.log(`Index ${index}: Error code`, err.response?.data?.code || err.message);
    }
}

async function run() {
    for (let i = 1; i <= 5; i++) {
        await testIndex(i);
    }
}
run();

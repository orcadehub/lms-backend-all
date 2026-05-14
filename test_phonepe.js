const crypto = require('crypto');
const axios = require('axios');

const mid = "M227J0WSRVQHP_2604082155";
const salt = "MWE5OGRjNzUtOTRlYy00NTQwLWI1NTAtODk3YmZhMDRjZTQx";
const index = 1;

const payload = {
    merchantId: mid,
    merchantTransactionId: "MT12345",
    merchantUserId: "U123",
    amount: 10000,
    redirectUrl: "http://localhost:5173/payment-status",
    redirectMode: "REDIRECT",
    mobileNumber: "9999999999",
    paymentInstrument: { type: "PAY_PAGE" }
};
const base64 = Buffer.from(JSON.stringify(payload)).toString('base64');
const hash = crypto.createHash('sha256').update(base64 + "/pg/v1/pay" + salt).digest('hex') + "###" + index;

async function testUrl(url) {
    try {
        console.log("Testing", url);
        const res = await axios.post(url + "/pg/v1/pay", { request: base64 }, {
            headers: { 'Content-Type': 'application/json', 'X-VERIFY': hash, 'accept': 'application/json' }
        });
        console.log("Success", res.data);
    } catch(err) {
        console.log("Error", err.response?.data || err.message);
    }
}

async function run() {
    await testUrl("https://api.phonepe.com/apis/hermes");
    await testUrl("https://api-preprod.phonepe.com/apis/pg-sandbox");
}
run();

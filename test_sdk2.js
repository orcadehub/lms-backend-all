const { StandardCheckoutClient, Env, StandardCheckoutPayRequest } = require('@phonepe-pg/pg-sdk-node');
const crypto = require('crypto');

const clientId = "M227J0WSRVQHP_2604082155";
const clientSecret = "MWE5OGRjNzUtOTRlYy00NTQwLWI1NTAtODk3YmZhMDRjZTQx";
const clientVersion = 1; // It says 1 in the docs
const env = Env.SANDBOX; 

const client = StandardCheckoutClient.getInstance(clientId, clientSecret, clientVersion, env);
const merchantOrderId = crypto.randomUUID();

const request = StandardCheckoutPayRequest.builder()
        .merchantOrderId(merchantOrderId)
        .amount(10000)
        .redirectUrl("http://localhost:5173/payment-status")
        .build();

client.pay(request).then(response => {
    console.log("Success:", response.redirectUrl);
}).catch(err => {
    console.error("Error:", err.message);
});

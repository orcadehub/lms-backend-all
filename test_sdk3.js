const { StandardCheckoutClient, Env, StandardCheckoutPayRequest } = require('@phonepe-pg/pg-sdk-node');
const crypto = require('crypto');

const clientId = "M227J0WSRVQHP_2604082155";
const clientSecret = "MWE5OGRjNzUtOTRlYy00NTQwLWI1NTAtODk3YmZhMDRjZTQx";
const clientVersion = 1; 

const client = StandardCheckoutClient.getInstance(clientId, clientSecret, clientVersion, Env.SANDBOX);
client.getOrderStatus("MT1234567").then(res => console.log("Status:", JSON.stringify(res, null, 2))).catch(err => console.log("Error:", err.message));

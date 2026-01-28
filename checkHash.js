const crypto = require('crypto');

const apiKey = 'fb8c49afd8d76d45b016100f1e5fb820de63d927305b7c13459be512645da278';
const expectedHash = '81a2c78b4787f926f049a0f323921ecbc928553a6de284d762b689d0c2c58d7c';

const calculatedHash = crypto.createHash('sha256').update(apiKey).digest('hex');

console.log('API Key:', apiKey);
console.log('Expected Hash (from DB):', expectedHash);
console.log('Calculated Hash:', calculatedHash);
console.log('Hashes Match:', calculatedHash === expectedHash);

if (calculatedHash !== expectedHash) {
  console.log('\n❌ HASH MISMATCH DETECTED!');
  console.log('The API key validation will fail because the hashes don\'t match.');
} else {
  console.log('\n✅ Hashes match - API key should work!');
}
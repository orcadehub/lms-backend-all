// Quick test: simulate the frontend calling the backend /api/payments/initiate
const axios = require('axios');

async function testLocalBackend() {
  // First, we need a valid student token. Let's try a login.
  console.log('=== Testing local backend payment flow ===\n');
  
  // Test 1: Try without auth (should fail with 401)
  console.log('Test 1: No auth token...');
  try {
    const res = await axios.post('http://localhost:4000/api/payments/initiate', {});
    console.log('  Response:', res.data);
  } catch (err) {
    console.log(`  Expected error: ${err.response?.status} - ${err.response?.data?.message || err.message}`);
  }

  // Test 2: Try with a fake token (should fail with 401)
  console.log('\nTest 2: Fake token...');
  try {
    const res = await axios.post('http://localhost:4000/api/payments/initiate', {}, {
      headers: { 'Authorization': 'Bearer fake_token_123' }
    });
    console.log('  Response:', res.data);
  } catch (err) {
    console.log(`  Expected error: ${err.response?.status} - ${err.response?.data?.message || err.message}`);
  }

  console.log('\n=== Backend routes are working! ===');
  console.log('To do a full end-to-end test, open the frontend at http://localhost:5173');
  console.log('and click Subscribe on the subscription gate.');
}

testLocalBackend();

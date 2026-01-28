const mongoose = require('mongoose');
const crypto = require('crypto');
const Tenant = require('./src/models/Tenant');
require('dotenv').config();

const validateApiKey = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const providedKey = 'fb8c49afd8d76d45b016100f1e5fb820de63d927305b7c13459be512645da278';
    console.log('🔍 Checking API key:', providedKey);

    // Hash the provided key
    const hashedKey = crypto.createHash('sha256').update(providedKey).digest('hex');
    console.log('🔐 Hashed key:', hashedKey);

    // Find tenant by hashed key
    const tenantByHash = await Tenant.findOne({ apiKeyHash: hashedKey });
    console.log('📋 Tenant by hash:', tenantByHash ? 'FOUND' : 'NOT FOUND');

    // Find tenant by plain key (for debugging)
    const tenantByPlain = await Tenant.findOne({ apiKey: providedKey });
    console.log('📋 Tenant by plain key:', tenantByPlain ? 'FOUND' : 'NOT FOUND');

    // List all tenants for debugging
    const allTenants = await Tenant.find({}, { name: 1, domain: 1, apiKey: 1, apiKeyHash: 1, isActive: 1 });
    console.log('\n📊 All tenants in database:');
    allTenants.forEach((tenant, index) => {
      console.log(`${index + 1}. ${tenant.name}`);
      console.log(`   Domain: ${tenant.domain}`);
      console.log(`   Active: ${tenant.isActive}`);
      console.log(`   API Key: ${tenant.apiKey}`);
      console.log(`   API Key Hash: ${tenant.apiKeyHash}`);
      console.log(`   Key Match: ${tenant.apiKey === providedKey ? '✅ YES' : '❌ NO'}`);
      console.log('');
    });

    if (tenantByPlain) {
      console.log('✅ API KEY IS VALID');
      console.log('🏢 Tenant Name:', tenantByPlain.name);
      console.log('🌐 Domain:', tenantByPlain.domain);
      console.log('📧 Admin Email:', tenantByPlain.adminEmail);
      console.log('🔄 Active:', tenantByPlain.isActive);
    } else {
      console.log('❌ API KEY IS INVALID');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    mongoose.connection.close();
  }
};

validateApiKey();
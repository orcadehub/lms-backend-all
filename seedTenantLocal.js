const mongoose = require('mongoose');
const Tenant = require('./src/models/Tenant');
require('dotenv').config();

const seedTenant = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if tenant already exists
    const tenantExists = await Tenant.findOne({ domain: 'localhost:3001' });
    if (tenantExists) {
      console.log('ℹ️  Tenant already exists');
      console.log('🏢 Name:', tenantExists.name);
      console.log('🌐 Domain:', tenantExists.domain);
      console.log('🔑 API Key:', tenantExists.apiKey);
      console.log('📧 Admin Email:', tenantExists.adminEmail);
      return;
    }

    // Create new tenant
    const tenant = new Tenant({
      name: 'Customer A',
      companyName: 'Customer A Company',
      adminEmail: 'orcadehub2@gmail.com',
      domain: 'localhost:3001',
      apiEndpoint: 'http://localhost:4000/api',
      allowedDomains: ['localhost:3001', 'localhost:5173'],
      themeColor: '#1976d2',
      logoUrl: 'https://coffee-geographical-ape-289.mypinata.cloud/ipfs/bafkreidw4alnkntpnmcqnpc3fck7utrjgxjgao5ocltqdsgyhf4ux6kyua',
      settings: {
        allowedOrigins: ['http://localhost:3001', 'http://localhost:5173'],
        features: ['quizzes', 'assessments', 'reports'],
        apiUsageLimit: 10000
      }
    });

    await tenant.save();
    
    console.log('✅ Tenant created successfully');
    console.log('🏢 Name:', tenant.name);
    console.log('🌐 Domain:', tenant.domain);
    console.log('🔑 API Key:', tenant.apiKey);
    console.log('📧 Admin Email:', tenant.adminEmail);
    console.log('🖼️  Logo URL:', tenant.logoUrl);
    
    console.log('\n📋 Add this to your .env file:');
    console.log(`VITE_TENANT_ID=${tenant._id}`);
    console.log(`VITE_TENANT_API_KEY=${tenant.apiKey}`);
    
  } catch (error) {
    console.error('❌ Error creating tenant:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedTenant();
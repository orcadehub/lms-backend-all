const mongoose = require('mongoose');
require('dotenv').config();
const Tenant = require('./models/Tenant');
const Assessment = require('./models/Assessment');

const checkDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
    console.log('Connected to DB');

    const tenants = await Tenant.find({});
    console.log(`\n--- Tenants (${tenants.length}) ---`);
    tenants.forEach(t => console.log(`- [${t._id}] ${t.name}`));

    const assessments = await Assessment.find({ title: { $regex: /^ORCA_/ } });
    console.log(`\n--- ORCA Assessments (${assessments.length}) ---`);
    assessments.forEach(a => console.log(`- [${a._id}] ${a.title} (Tenant: ${a.tenantId})`));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
};

checkDb();

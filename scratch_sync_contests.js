const mongoose = require('mongoose');
require('dotenv').config();
const { createContestForTenant } = require('./services/cronJobs');
const Tenant = require('./models/Tenant');
const Assessment = require('./models/Assessment');

const syncContests = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
    console.log('Connected to DB');

    // Find the existing contest to duplicate
    const existingContest = await Assessment.findOne({ title: 'ORCA_D0001' });
    if (!existingContest) {
      console.log('ORCA_D0001 not found!');
      return;
    }

    const activeTenants = await Tenant.find({ isActive: true });
    
    for (const tenant of activeTenants) {
      // Check if tenant already has ORCA_D0001
      const hasContest = await Assessment.findOne({ tenantId: tenant._id, title: 'ORCA_D0001' });
      if (!hasContest) {
        console.log(`Creating ORCA_D0001 for tenant ${tenant.name}...`);
        await createContestForTenant(tenant, 'daily', 'ORCA_D0001', '21:00');
      } else {
        console.log(`Tenant ${tenant.name} already has ORCA_D0001.`);
      }
    }

    console.log('Sync complete.');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
};

syncContests();

const mongoose = require('mongoose');
require('dotenv').config();

const Batch = require('./models/Batch');
const Message = require('./models/Message');

const run = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/lms';
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('Connected successfully!');

    // Find active batches that contain "mern" in their name (case-insensitive)
    const mernBatches = await Batch.find({
      name: { $regex: /mern/i },
      isActive: true
    });

    console.log(`Found ${mernBatches.length} MERN stack batches:`);
    for (const b of mernBatches) {
      console.log(`- Batch: ${b.name} (ID: ${b._id}, Tenant ID: ${b.tenant}, Students Count: ${b.students.length})`);
    }

    if (mernBatches.length === 0) {
      console.log('❌ No active MERN stack batches found.');
      process.exit(0);
    }

    // Group batches by tenant since a message belongs to a single tenant
    const batchesByTenant = {};
    for (const b of mernBatches) {
      if (!batchesByTenant[b.tenant]) {
        batchesByTenant[b.tenant] = [];
      }
      batchesByTenant[b.tenant].push(b._id);
    }

    for (const tenantId in batchesByTenant) {
      const batchIds = batchesByTenant[tenantId];
      console.log(`Creating message for tenant ${tenantId} and batches ${batchIds.join(', ')}...`);

      const msg = await Message.create({
        batches: batchIds,
        tenant: tenantId,
        title: '🚨 Join OrcadeHub Official Discord Server',
        content: `Dear Student,\n\nPlease join the official OrcadeHub Discord server for class links, session updates, assignments, and support.\n\n👉 Join Discord here: https://discord.gg/c89wxMs4G\n\nIt is mandatory for all students to join the server immediately.\n\nBest regards,\nTeam OrcadeHub`,
        readBy: []
      });

      console.log(`✅ Message created successfully! (ID: ${msg._id})`);
    }

    console.log('All operations completed.');
    process.exit(0);
  } catch (err) {
    console.error('Error running script:', err);
    process.exit(1);
  }
};

run();

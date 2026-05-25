const mongoose = require('mongoose');
const Message = require('../models/Message');
require('dotenv').config({ path: '.env' });

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    const titlesToDelete = [
      'Welcome to Orcade Hub!',
      'Upcoming Assessment Alert',
      'Resume-Based Mock Interview Feature is Live',
      'Performance Report & Feedback'
    ];

    const result = await Message.deleteMany({ title: { $in: titlesToDelete } });
    console.log(`Deleted ${result.deletedCount} mock messages.`);

  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected');
  }
}

run();

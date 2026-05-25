const mongoose = require('mongoose');
const Message = require('../models/Message');
const Batch = require('../models/Batch');
require('dotenv').config({ path: '.env' }); // MONGODB_URI is in be/.env

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    const mernBatch = await Batch.findOne({ name: 'MERN-ANNIVERSARY-BATCH' });
    if (!mernBatch) {
      console.log('MERN batch not found');
      return;
    }

    const newMessage = new Message({
      batches: [mernBatch._id],
      tenant: mernBatch.tenant,
      title: 'Welcome to the MERN Stack Anniversary Edition!',
      content: 'We are thrilled to have you in the MERN Stack Anniversary Edition! Over the next 8 weeks, you will build full-stack web applications, master React, build robust Node.js APIs, and deploy your projects. Please join the Discord server for announcements and support. Let\'s get coding!',
      readBy: [],
      createdAt: new Date()
    });

    await newMessage.save();
    console.log('Successfully added message for MERN students!');
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected');
  }
}

run();

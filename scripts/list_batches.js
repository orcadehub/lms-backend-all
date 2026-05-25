const mongoose = require('mongoose');
const Batch = require('../models/Batch');
require('dotenv').config({ path: '../.env' });

async function run() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
  const batches = await Batch.find({}, 'name students');
  console.log("Batches:", batches.map(b => ({ name: b.name, studentsCount: b.students.length })));
  process.exit(0);
}
run();

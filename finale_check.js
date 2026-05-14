const mongoose = require('mongoose');
const StudyMaterial = require('./models/StudyMaterial');
require('dotenv').config();

async function finaleCheck() {
  console.log("Using URI:", process.env.MONGODB_URI);
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms');
  const materials = await StudyMaterial.find({});
  console.log("Database Name:", mongoose.connection.name);
  console.log("Total Materials in DB:", materials.length);
  materials.forEach((m, i) => {
    console.log(`[${i}] Title: "${m.title}", Chapters: ${m.chapters.length}`);
  });
  process.exit(0);
}
finaleCheck();

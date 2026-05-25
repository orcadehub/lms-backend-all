const mongoose = require('mongoose');
require('dotenv').config();
const ProgrammingTopic = require('./models/ProgrammingTopic');

const newTopics = [
  "inputs",
  "operators",
  "conditions",
  "nested conditions",
  "loops",
  "while loops",
  "pattern printing",
  "arrays",
  "strings",
  "recursion",
  "matrices"
];

async function updateTopics() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    // Remove existing topics
    await ProgrammingTopic.deleteMany({});
    console.log('Cleared existing topics');

    // Insert new topics
    const topicsToInsert = newTopics.map((name, index) => ({
      name,
      order: index + 1,
      isActive: true
    }));

    await ProgrammingTopic.insertMany(topicsToInsert);
    console.log('Successfully inserted new topics');

    mongoose.disconnect();
  } catch (error) {
    console.error('Error updating topics:', error);
    mongoose.disconnect();
  }
}

updateTopics();

const mongoose = require('mongoose');
const Topic = require('./models/Topic');
const SubTopic = require('./models/SubTopic');
require('dotenv').config();

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const topics = await Topic.find({});
  console.log("Topics:", topics.length);
  const subtopics = await SubTopic.find({});
  console.log("SubTopics:", subtopics.length);
  process.exit(0);
}
run();

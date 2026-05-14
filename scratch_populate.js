const mongoose = require('mongoose');
const ProgrammingTopic = require('./models/ProgrammingTopic');
require('dotenv').config();

const topicOrder = [
  'Inputs', 'Operators', 'Conditions', 'Nested Conditions', 'Loops', 
  'While Loop', 'Nested Loops', 'Pattern Printing', 'Arrays', 'Strings', 
  '2D Arrays', 'Functions', 'Class & Objects', 'Recursion', 'Hashing',
  'Two Pointers', 'Sliding Window', 'Linked List', 'Stack', 'Queue', 
  'Binary Search', 'Bit Manipulation', 'Tree', 'Graph', 'Backtracking',
  'Dynamic Programming', 'Greedy'
];

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  await ProgrammingTopic.deleteMany({});
  
  const docs = topicOrder.map((name, index) => ({
    name,
    order: index + 1,
    isActive: true
  }));
  
  await ProgrammingTopic.insertMany(docs);
  console.log('Inserted', docs.length, 'topics.');
  process.exit(0);
}
run();

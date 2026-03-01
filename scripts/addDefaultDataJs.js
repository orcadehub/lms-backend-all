const mongoose = require('mongoose');
require('dotenv').config();
const FrontendQuestion = require('../models/FrontendQuestion');

const studentData = `const students = [
  { id: 1, name: "Alice Johnson", age: 20, grade: "A", course: "Computer Science" },
  { id: 2, name: "Bob Smith", age: 22, grade: "B", course: "Mathematics" },
  { id: 3, name: "Charlie Brown", age: 21, grade: "A", course: "Physics" },
  { id: 4, name: "Diana Prince", age: 23, grade: "B", course: "Computer Science" },
  { id: 5, name: "Eve Davis", age: 20, grade: "A", course: "Chemistry" }
];`;

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const result = await FrontendQuestion.updateMany(
    {
      title: { $in: ['Filter and Display Student Cards', 'Display Student Data in Table'] }
    },
    {
      $set: { 'defaultFiles.dataJs': studentData }
    }
  );
  
  console.log(`Updated ${result.modifiedCount} questions with default data.js content`);
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});

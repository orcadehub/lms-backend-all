const mongoose = require('mongoose');
require('dotenv').config();
const FrontendQuestion = require('../models/FrontendQuestion');

const studentData = `const students = [
  { id: 1, name: "Alice Johnson", age: 20, grade: "A", course: "Computer Science", email: "alice.johnson@example.com" },
  { id: 2, name: "Bob Smith", age: 22, grade: "B", course: "Mathematics", email: "bob.smith@example.com" },
  { id: 3, name: "Charlie Brown", age: 21, grade: "A", course: "Physics", email: "charlie.brown@example.com" },
  { id: 4, name: "Diana Prince", age: 23, grade: "B", course: "Computer Science", email: "diana.prince@example.com" },
  { id: 5, name: "Eve Davis", age: 20, grade: "A", course: "Chemistry", email: "eve.davis@example.com" }
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
  
  console.log(`Updated ${result.modifiedCount} questions with complete student data (added email field)`);
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});

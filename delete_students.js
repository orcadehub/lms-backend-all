const mongoose = require('mongoose');
const Student = require('./models/Student');
require('dotenv').config();

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const names = ['ASHMIT TIRKEY', 'ADITYA KUMAR SAHOO'];
    
    for (const name of names) {
      // Find students by name (case-insensitive)
      const students = await Student.find({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
      
      if (students.length === 0) {
        console.log(`No student found with name: ${name}`);
      } else {
        for (const student of students) {
          console.log(`Deleting student: ${student.name} (${student.email})`);
          await Student.deleteOne({ _id: student._id });
          console.log(`Deleted successfully.`);
        }
      }
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

run();

const mongoose = require('mongoose');
const Student = require('./models/Student');
const PracticeSubmission = require('./models/PracticeSubmission');
const AssessmentAttempt = require('./models/AssessmentAttempt');
require('dotenv').config();

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const emails = ['2301020014@cgu-odisha.ac.in', '2301020053@cgu-odisha.ac.in'];
    
    // We already deleted the students, but just in case we need their IDs to delete their data, 
    // wait, if we already deleted the students, we can't find their IDs by email easily unless the data is keyed by email.
    // Let's check how PracticeSubmission links to the student. Is it by student ObjectId or email?
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}
run();

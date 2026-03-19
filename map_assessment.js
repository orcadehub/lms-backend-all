const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Assessment = require('./models/Assessment');
const SQLPlaygroundQuestion = require('./models/SQLPlaygroundQuestion');

const ASSESSMENT_ID = '69bbfbcb88a2def6ded59b7a';

async function mapAssessment() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const questions = await SQLPlaygroundQuestion.find();
    const ids = questions.map(q => q._id);
    
    const result = await Assessment.findByIdAndUpdate(ASSESSMENT_ID, { sqlPlaygroundQuestions: ids });
    if(result) {
      console.log(`Assessment updated with ${ids.length} total SQL questions!`);
    } else {
      console.log(`Could not find assessment with ID ${ASSESSMENT_ID}`);
    }
  } catch(err) {
    console.error('Error mapping assessment:', err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

mapAssessment();

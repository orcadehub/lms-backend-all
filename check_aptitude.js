const mongoose = require('mongoose');
require('dotenv').config();
const AptitudeQuestion = require('./models/AptitudeQuestion');

async function checkAptitudeQuestions() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const count = await AptitudeQuestion.countDocuments();
        console.log(`Total Aptitude Questions: ${count}`);

        if (count > 0) {
            const sample = await AptitudeQuestion.findOne();
            console.log('Sample Question:', sample.question);
            console.log('Topic:', sample.topic);
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkAptitudeQuestions();

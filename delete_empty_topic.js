const mongoose = require('mongoose');
require('dotenv').config();
const AptitudeQuestion = require('./models/AptitudeQuestion');

async function deleteEmptyTopic() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Find questions with empty or space-only topic
        const result = await AptitudeQuestion.deleteMany({ 
            $or: [
                { topic: " " },
                { topic: "" },
                { topic: { $exists: false } }
            ]
        });

        console.log(`Deleted ${result.deletedCount} questions with empty topics.`);

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

deleteEmptyTopic();

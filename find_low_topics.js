const mongoose = require('mongoose');
require('dotenv').config();
const AptitudeQuestion = require('./models/AptitudeQuestion');

async function findLowCountTopics() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const topicsWithCounts = await AptitudeQuestion.aggregate([
            { $group: { _id: "$topic", count: { $sum: 1 } } },
            { $project: { topic: "$_id", count: 1, _id: 0 } },
            { $sort: { count: 1 } }
        ]);

        console.log('Topics with low counts:');
        topicsWithCounts.filter(t => t.count <= 1).forEach(t => {
            console.log(`Topic: "${t.topic}", Count: ${t.count}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

findLowCountTopics();

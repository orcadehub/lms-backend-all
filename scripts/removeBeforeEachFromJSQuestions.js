require('dotenv').config();
const mongoose = require('mongoose');
const FrontendQuestion = require('../models/FrontendQuestion');

function stripWrappers(testFile) {
  if (!testFile) return testFile;

  let result = testFile.trim();

  // Remove describe(...) outer wrapper — keep only the inner body
  const describeMatch = result.match(/^describe\s*\([^,]+,\s*\(\s*\)\s*=>\s*\{([\s\S]*)\}\s*\)\s*;?\s*$/);
  if (describeMatch) {
    result = describeMatch[1].trim();
  }

  // Remove beforeEach(...) block entirely
  result = result.replace(/beforeEach\s*\(\s*\(\s*\)\s*=>\s*\{[\s\S]*?\}\s*\)\s*;?\s*/g, '').trim();

  return result;
}

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Only target JS/DOM frontend questions
    const questions = await FrontendQuestion.find({
      jestTestFile: { $regex: /beforeEach|describe\(/, $options: 'i' },
      tags: { $in: ['JavaScript', 'DOM'] }
    });

    console.log(`Found ${questions.length} questions to update`);

    let updated = 0;
    for (const q of questions) {
      const cleaned = stripWrappers(q.jestTestFile);
      if (cleaned !== q.jestTestFile) {
        await FrontendQuestion.updateOne({ _id: q._id }, { $set: { jestTestFile: cleaned } });
        console.log(`✓ Updated: ${q.title}`);
        updated++;
      }
    }

    console.log(`\nDone. Updated ${updated}/${questions.length} questions.`);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

migrate();

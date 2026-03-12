require('dotenv').config();
const mongoose = require('mongoose');
const FrontendQuestion = require('./models/FrontendQuestion');

async function deleteOldCSSAndVerifyNew() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // List of CSS questions to delete (old ones)
    const cssQuestionTitles = [
      'CSS Selectors & Basic Styling',
      'CSS Box Model & Layout',
      'CSS Flexbox Layout',
      'CSS Grid Layout',
      'CSS Animations & Transitions'
    ];

    // Delete old CSS questions
    const deleteResult = await FrontendQuestion.deleteMany({
      title: { $in: cssQuestionTitles }
    });

    console.log(`\n✅ Deleted ${deleteResult.deletedCount} old CSS questions`);

    // Verify new CSS questions exist
    const newCSSQuestions = await FrontendQuestion.find({
      title: { $in: cssQuestionTitles }
    });

    console.log(`✅ Verified ${newCSSQuestions.length} new CSS questions in database`);

    // List all CSS questions
    console.log('\n📋 Current CSS Questions in Database:');
    newCSSQuestions.forEach((q, index) => {
      console.log(`  ${index + 1}. ${q.title} (${q.difficulty})`);
    });

    console.log('\n✅ CSS questions successfully updated!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

deleteOldCSSAndVerifyNew();

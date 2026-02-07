require('dotenv').config();
const mongoose = require('mongoose');
const Topic = require('./models/Topic');
const SubTopic = require('./models/SubTopic');
const GamifiedQuestion = require('./models/GamifiedQuestion');

const seedLogicalReasoning = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Use existing subtopic ID
    const subtopicId = '698571061e0c0caac68e26fb';
    const subtopic = await SubTopic.findById(subtopicId);
    
    if (!subtopic) {
      console.error('Subtopic not found with ID:', subtopicId);
      return;
    }
    
    console.log('Found subtopic:', subtopic.title);

    // Create Syllogisms Game with 20 levels
    const syllogismsGame = {
      subTopicId: subtopic._id,
      title: 'Syllogisms Master Challenge',
      description: 'Progress through 20 levels of syllogistic reasoning',
      difficulty: 'Hard',
      points: 40,
      gameType: 'LogicPuzzle',
      isMultiLevel: true,
      totalLevels: 20,
      hasTimer: true,
      totalTimeLimit: 1200,
      levels: [
        { levelNumber: 1, levelTitle: 'Basic Syllogism', questionType: 'MCQ', question: 'All cats are animals. All animals need food. Therefore:', options: [{ id: 'A', text: 'All cats need food', isCorrect: true }, { id: 'B', text: 'Some cats need food', isCorrect: false }, { id: 'C', text: 'No cats need food', isCorrect: false }, { id: 'D', text: 'Cannot be determined', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'Follow the chain: cats → animals → food', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 2, levelTitle: 'Simple Chain', questionType: 'MCQ', question: 'All dogs are pets. All pets need care. Therefore:', options: [{ id: 'A', text: 'All dogs need care', isCorrect: true }, { id: 'B', text: 'Some dogs need care', isCorrect: false }, { id: 'C', text: 'No dogs need care', isCorrect: false }, { id: 'D', text: 'Cannot be determined', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'Follow: dogs → pets → care', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 3, levelTitle: 'Negative Premise', questionType: 'MCQ', question: 'No birds are mammals. All bats are mammals. Therefore:', options: [{ id: 'A', text: 'No bats are birds', isCorrect: true }, { id: 'B', text: 'Some bats are birds', isCorrect: false }, { id: 'C', text: 'All bats are birds', isCorrect: false }, { id: 'D', text: 'Cannot be determined', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'Bats are mammals, birds are not mammals', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 4, levelTitle: 'Particular Statement', questionType: 'MCQ', question: 'Some doctors are teachers. All teachers are educated. Therefore:', options: [{ id: 'A', text: 'Some doctors are educated', isCorrect: true }, { id: 'B', text: 'All doctors are educated', isCorrect: false }, { id: 'C', text: 'No doctors are educated', isCorrect: false }, { id: 'D', text: 'Cannot be determined', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'At least some doctors who are teachers are educated', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 5, levelTitle: 'Three-Term Chain', questionType: 'MCQ', question: 'All roses are flowers. All flowers are plants. All plants need water. Therefore:', options: [{ id: 'A', text: 'All roses need water', isCorrect: true }, { id: 'B', text: 'Some roses need water', isCorrect: false }, { id: 'C', text: 'No roses need water', isCorrect: false }, { id: 'D', text: 'Cannot be determined', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'Chain: roses → flowers → plants → water', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 6, levelTitle: 'Mixed Statements', questionType: 'MCQ', question: 'All squares are rectangles. No circles are rectangles. Therefore:', options: [{ id: 'A', text: 'No circles are squares', isCorrect: true }, { id: 'B', text: 'Some circles are squares', isCorrect: false }, { id: 'C', text: 'All circles are squares', isCorrect: false }, { id: 'D', text: 'Cannot be determined', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'Squares are rectangles, circles are not', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 7, levelTitle: 'Reverse Logic', questionType: 'MCQ', question: 'Some engineers are managers. All managers are leaders. Therefore:', options: [{ id: 'A', text: 'Some engineers are leaders', isCorrect: true }, { id: 'B', text: 'All engineers are leaders', isCorrect: false }, { id: 'C', text: 'All leaders are engineers', isCorrect: false }, { id: 'D', text: 'No engineers are leaders', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'Engineers who are managers are also leaders', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 8, levelTitle: 'Double Negative', questionType: 'MCQ', question: 'No honest people are thieves. Some politicians are not thieves. Therefore:', options: [{ id: 'A', text: 'Cannot be determined', isCorrect: true }, { id: 'B', text: 'Some politicians are honest', isCorrect: false }, { id: 'C', text: 'All politicians are honest', isCorrect: false }, { id: 'D', text: 'No politicians are honest', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'Not being a thief ≠ being honest', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 9, levelTitle: 'Multiple Conclusions', questionType: 'MCQ', question: 'All books are papers. Some papers are magazines. Which is valid?', options: [{ id: 'A', text: 'Some magazines may be books', isCorrect: true }, { id: 'B', text: 'All magazines are books', isCorrect: false }, { id: 'C', text: 'No magazines are books', isCorrect: false }, { id: 'D', text: 'All books are magazines', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'Papers overlap with both books and magazines', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 10, levelTitle: 'Complex Chain', questionType: 'MCQ', question: 'No metal is liquid at room temp. Mercury is liquid at room temp. All elements are metal or non-metal. Therefore:', options: [{ id: 'A', text: 'Mercury is a non-metal', isCorrect: true }, { id: 'B', text: 'Mercury is a metal', isCorrect: false }, { id: 'C', text: 'Mercury is not an element', isCorrect: false }, { id: 'D', text: 'Cannot be determined', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'Mercury is liquid, metals are not liquid', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 11, levelTitle: 'Abstract Variables', questionType: 'MCQ', question: 'All A are B. No B are C. Some D are C. All E are A. Which is true?', options: [{ id: 'A', text: 'No E are C', isCorrect: true }, { id: 'B', text: 'Some D are A', isCorrect: false }, { id: 'C', text: 'All D are E', isCorrect: false }, { id: 'D', text: 'Some E are D', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'E → A → B, and no B are C', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 12, levelTitle: 'Conditional Logic', questionType: 'MCQ', question: 'If all X are Y, and some Y are Z, what can we conclude?', options: [{ id: 'A', text: 'Some X may be Z', isCorrect: true }, { id: 'B', text: 'All X are Z', isCorrect: false }, { id: 'C', text: 'No X are Z', isCorrect: false }, { id: 'D', text: 'All Z are X', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'X overlaps with Y, Y overlaps with Z', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 13, levelTitle: 'Exclusion Logic', questionType: 'MCQ', question: 'No P are Q. All R are Q. Some S are P. Therefore:', options: [{ id: 'A', text: 'No R are P', isCorrect: true }, { id: 'B', text: 'Some R are P', isCorrect: false }, { id: 'C', text: 'All S are R', isCorrect: false }, { id: 'D', text: 'No S are R', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'R are Q, but P are not Q', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 14, levelTitle: 'Intersection Logic', questionType: 'MCQ', question: 'Some M are N. All N are O. No O are P. Therefore:', options: [{ id: 'A', text: 'Some M are not P', isCorrect: true }, { id: 'B', text: 'All M are P', isCorrect: false }, { id: 'C', text: 'No M are O', isCorrect: false }, { id: 'D', text: 'All M are N', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'M → N → O, and O excludes P', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 15, levelTitle: 'Transitive Property', questionType: 'MCQ', question: 'All J are K. All K are L. No L are M. Some N are J. Therefore:', options: [{ id: 'A', text: 'Some N are not M', isCorrect: true }, { id: 'B', text: 'All N are M', isCorrect: false }, { id: 'C', text: 'No N are L', isCorrect: false }, { id: 'D', text: 'All J are M', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'N → J → K → L, and L excludes M', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 16, levelTitle: 'Partial Overlap', questionType: 'MCQ', question: 'Some U are V. Some V are W. No W are X. What is certain?', options: [{ id: 'A', text: 'Cannot determine relationship between U and X', isCorrect: true }, { id: 'B', text: 'No U are X', isCorrect: false }, { id: 'C', text: 'All U are W', isCorrect: false }, { id: 'D', text: 'Some U are X', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'Partial overlaps don\'t guarantee full relationships', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 17, levelTitle: 'Negation Chain', questionType: 'MCQ', question: 'No F are G. All H are F. Some I are not G. Therefore:', options: [{ id: 'A', text: 'No H are G', isCorrect: true }, { id: 'B', text: 'Some H are G', isCorrect: false }, { id: 'C', text: 'All I are H', isCorrect: false }, { id: 'D', text: 'Some I are F', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'H are F, and F excludes G', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 18, levelTitle: 'Complex Exclusion', questionType: 'MCQ', question: 'All T are U. No U are V. Some W are V. All X are T. Therefore:', options: [{ id: 'A', text: 'No X are V', isCorrect: true }, { id: 'B', text: 'Some X are W', isCorrect: false }, { id: 'C', text: 'All W are U', isCorrect: false }, { id: 'D', text: 'Some T are V', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'X → T → U, and U excludes V', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 19, levelTitle: 'Multi-Path Logic', questionType: 'MCQ', question: 'All Q are R. Some R are S. No S are T. All U are Q. What is definite?', options: [{ id: 'A', text: 'All U are R', isCorrect: true }, { id: 'B', text: 'Some U are T', isCorrect: false }, { id: 'C', text: 'All U are S', isCorrect: false }, { id: 'D', text: 'No U are S', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'U → Q → R is certain', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 20, levelTitle: 'Ultimate Challenge', questionType: 'MCQ', question: 'All A are B. Some B are C. No C are D. All E are A. Some F are C. Which must be true?', options: [{ id: 'A', text: 'All E are B', isCorrect: true }, { id: 'B', text: 'Some E are D', isCorrect: false }, { id: 'C', text: 'All F are B', isCorrect: false }, { id: 'D', text: 'No E are C', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'E → A → B is the only certain path', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true }
      ],
      aiShuffle: {
        enabled: true,
        shuffleType: 'adaptive',
        adaptiveSettings: {
          increaseOnSuccess: true,
          decreaseOnFailure: true
        }
      },
      speedBonus: {
        enabled: true,
        maxBonus: 20,
        timeThreshold: 300
      },
      tags: ['Logic', 'Syllogisms', 'Deductive Reasoning'],
      order: 1
    };

    // Check if game already exists
    const existingGame = await GamifiedQuestion.findOne({
      subTopicId: subtopic._id,
      title: syllogismsGame.title
    });

    if (existingGame) {
      console.log('Syllogisms game already exists, skipping...');
    } else {
      await GamifiedQuestion.create(syllogismsGame);
      console.log('✅ Created Syllogisms Master Challenge with 20 levels');
    }

    console.log('\n🎮 Seed completed successfully!');
    console.log(`Subtopic: ${subtopic.title}`);
    console.log(`Game: Syllogisms Master Challenge (20 levels)`);

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

seedLogicalReasoning();

require('dotenv').config();
const mongoose = require('mongoose');
const SubTopic = require('./models/SubTopic');
const GamifiedQuestion = require('./models/GamifiedQuestion');

const seedBloodRelations = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const subtopicId = '698571061e0c0caac68e26fb';
    const subtopic = await SubTopic.findById(subtopicId);
    
    if (!subtopic) {
      console.error('Subtopic not found');
      return;
    }

    const bloodRelationsGame = {
      subTopicId: subtopic._id,
      title: 'Blood Relations Master Challenge',
      description: 'Solve 20 family relationship puzzles',
      difficulty: 'Hard',
      points: 40,
      gameType: 'LogicPuzzle',
      isMultiLevel: true,
      totalLevels: 20,
      hasTimer: true,
      totalTimeLimit: 1200,
      levels: [
        { levelNumber: 1, levelTitle: 'Basic Relation', questionType: 'MCQ', question: 'A is B\'s father. B is C\'s mother. How is A related to C?', options: [{ id: 'A', text: 'Grandfather', isCorrect: true }, { id: 'B', text: 'Father', isCorrect: false }, { id: 'C', text: 'Uncle', isCorrect: false }, { id: 'D', text: 'Brother', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'A is father of B, B is mother of C', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 2, levelTitle: 'Sibling Relation', questionType: 'MCQ', question: 'A is B\'s sister. B is C\'s father. How is A related to C?', options: [{ id: 'A', text: 'Aunt', isCorrect: true }, { id: 'B', text: 'Mother', isCorrect: false }, { id: 'C', text: 'Sister', isCorrect: false }, { id: 'D', text: 'Grandmother', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'A is sister of B, B is father of C', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 3, levelTitle: 'Parent Chain', questionType: 'MCQ', question: 'A is B\'s mother. C is B\'s son. How is A related to C?', options: [{ id: 'A', text: 'Grandmother', isCorrect: true }, { id: 'B', text: 'Mother', isCorrect: false }, { id: 'C', text: 'Aunt', isCorrect: false }, { id: 'D', text: 'Sister', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'A → B → C', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 4, levelTitle: 'Uncle Relation', questionType: 'MCQ', question: 'A is B\'s brother. B is C\'s mother. How is A related to C?', options: [{ id: 'A', text: 'Uncle', isCorrect: true }, { id: 'B', text: 'Father', isCorrect: false }, { id: 'C', text: 'Brother', isCorrect: false }, { id: 'D', text: 'Grandfather', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'Brother of mother is uncle', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 5, levelTitle: 'Cousin Relation', questionType: 'MCQ', question: 'A and B are brothers. C is A\'s son. D is B\'s daughter. How is C related to D?', options: [{ id: 'A', text: 'Cousin', isCorrect: true }, { id: 'B', text: 'Brother', isCorrect: false }, { id: 'C', text: 'Uncle', isCorrect: false }, { id: 'D', text: 'Nephew', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'Children of brothers are cousins', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 6, levelTitle: 'In-law Relation', questionType: 'MCQ', question: 'A is B\'s wife. C is B\'s father. How is A related to C?', options: [{ id: 'A', text: 'Daughter-in-law', isCorrect: true }, { id: 'B', text: 'Daughter', isCorrect: false }, { id: 'C', text: 'Sister', isCorrect: false }, { id: 'D', text: 'Mother', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'Wife of son is daughter-in-law', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 7, levelTitle: 'Nephew Relation', questionType: 'MCQ', question: 'A is B\'s sister. C is B\'s son. How is C related to A?', options: [{ id: 'A', text: 'Nephew', isCorrect: true }, { id: 'B', text: 'Son', isCorrect: false }, { id: 'C', text: 'Brother', isCorrect: false }, { id: 'D', text: 'Cousin', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'Son of sibling is nephew/niece', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 8, levelTitle: 'Brother-in-law', questionType: 'MCQ', question: 'A is B\'s husband. C is B\'s brother. How is A related to C?', options: [{ id: 'A', text: 'Brother-in-law', isCorrect: true }, { id: 'B', text: 'Brother', isCorrect: false }, { id: 'C', text: 'Uncle', isCorrect: false }, { id: 'D', text: 'Father', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'Husband of sister is brother-in-law', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 9, levelTitle: 'Three Generation', questionType: 'MCQ', question: 'A is B\'s grandfather. C is B\'s son. How is A related to C?', options: [{ id: 'A', text: 'Great-grandfather', isCorrect: true }, { id: 'B', text: 'Grandfather', isCorrect: false }, { id: 'C', text: 'Father', isCorrect: false }, { id: 'D', text: 'Uncle', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'Three generations: A → B → C', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 10, levelTitle: 'Maternal Uncle', questionType: 'MCQ', question: 'A is B\'s mother. C is A\'s brother. How is C related to B?', options: [{ id: 'A', text: 'Maternal Uncle', isCorrect: true }, { id: 'B', text: 'Paternal Uncle', isCorrect: false }, { id: 'C', text: 'Father', isCorrect: false }, { id: 'D', text: 'Grandfather', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'Mother\'s brother is maternal uncle', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 11, levelTitle: 'Sister-in-law', questionType: 'MCQ', question: 'A is B\'s wife. C is A\'s sister. How is C related to B?', options: [{ id: 'A', text: 'Sister-in-law', isCorrect: true }, { id: 'B', text: 'Sister', isCorrect: false }, { id: 'C', text: 'Wife', isCorrect: false }, { id: 'D', text: 'Daughter', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'Wife\'s sister is sister-in-law', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 12, levelTitle: 'Complex Chain', questionType: 'MCQ', question: 'A is B\'s father. C is B\'s sister. D is C\'s daughter. How is A related to D?', options: [{ id: 'A', text: 'Grandfather', isCorrect: true }, { id: 'B', text: 'Father', isCorrect: false }, { id: 'C', text: 'Uncle', isCorrect: false }, { id: 'D', text: 'Brother', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'A is father of C, D is daughter of C', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 13, levelTitle: 'Niece Relation', questionType: 'MCQ', question: 'A is B\'s brother. C is B\'s daughter. How is C related to A?', options: [{ id: 'A', text: 'Niece', isCorrect: true }, { id: 'B', text: 'Daughter', isCorrect: false }, { id: 'C', text: 'Sister', isCorrect: false }, { id: 'D', text: 'Cousin', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'Daughter of sibling is niece', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 14, levelTitle: 'Mother-in-law', questionType: 'MCQ', question: 'A is B\'s husband. C is A\'s mother. How is C related to B?', options: [{ id: 'A', text: 'Mother-in-law', isCorrect: true }, { id: 'B', text: 'Mother', isCorrect: false }, { id: 'C', text: 'Grandmother', isCorrect: false }, { id: 'D', text: 'Aunt', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'Husband\'s mother is mother-in-law', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 15, levelTitle: 'Paternal Aunt', questionType: 'MCQ', question: 'A is B\'s father. C is A\'s sister. How is C related to B?', options: [{ id: 'A', text: 'Paternal Aunt', isCorrect: true }, { id: 'B', text: 'Maternal Aunt', isCorrect: false }, { id: 'C', text: 'Mother', isCorrect: false }, { id: 'D', text: 'Sister', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'Father\'s sister is paternal aunt', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 16, levelTitle: 'Son-in-law', questionType: 'MCQ', question: 'A is B\'s daughter. C is A\'s husband. How is C related to B?', options: [{ id: 'A', text: 'Son-in-law', isCorrect: true }, { id: 'B', text: 'Son', isCorrect: false }, { id: 'C', text: 'Brother', isCorrect: false }, { id: 'D', text: 'Nephew', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'Daughter\'s husband is son-in-law', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 17, levelTitle: 'Multi-path', questionType: 'MCQ', question: 'A and B are sisters. C is A\'s husband. D is B\'s son. How is C related to D?', options: [{ id: 'A', text: 'Uncle', isCorrect: true }, { id: 'B', text: 'Father', isCorrect: false }, { id: 'C', text: 'Brother', isCorrect: false }, { id: 'D', text: 'Cousin', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'Husband of maternal aunt is uncle', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 18, levelTitle: 'Grandmother Path', questionType: 'MCQ', question: 'A is B\'s mother. B is C\'s mother. D is C\'s daughter. How is A related to D?', options: [{ id: 'A', text: 'Great-grandmother', isCorrect: true }, { id: 'B', text: 'Grandmother', isCorrect: false }, { id: 'C', text: 'Mother', isCorrect: false }, { id: 'D', text: 'Aunt', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'Three generations through mothers', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 19, levelTitle: 'Complex In-law', questionType: 'MCQ', question: 'A is B\'s wife. C is B\'s brother. D is C\'s wife. How is A related to D?', options: [{ id: 'A', text: 'Sister-in-law', isCorrect: true }, { id: 'B', text: 'Sister', isCorrect: false }, { id: 'C', text: 'Cousin', isCorrect: false }, { id: 'D', text: 'Aunt', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'Wives of brothers are sisters-in-law', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 20, levelTitle: 'Ultimate Challenge', questionType: 'MCQ', question: 'A is B\'s father. C is B\'s wife. D is C\'s brother. E is D\'s son. How is E related to B?', options: [{ id: 'A', text: 'Nephew', isCorrect: true }, { id: 'B', text: 'Son', isCorrect: false }, { id: 'C', text: 'Brother', isCorrect: false }, { id: 'D', text: 'Cousin', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'E is son of D, D is brother of C, C is wife of B', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true }
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
        timeThreshold: 600
      },
      tags: ['Logic', 'Blood Relations', 'Family'],
      order: 2
    };

    const existingGame = await GamifiedQuestion.findOne({
      subTopicId: subtopic._id,
      title: bloodRelationsGame.title
    });

    if (existingGame) {
      console.log('Blood Relations game already exists, skipping...');
    } else {
      await GamifiedQuestion.create(bloodRelationsGame);
      console.log('✅ Created Blood Relations Master Challenge with 20 levels');
    }

    console.log('\n🎮 Seed completed successfully!');
    console.log(`Subtopic: ${subtopic.title}`);
    console.log(`Game: Blood Relations Master Challenge (20 levels)`);

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

seedBloodRelations();

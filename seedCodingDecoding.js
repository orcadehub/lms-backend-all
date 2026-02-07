require('dotenv').config();
const mongoose = require('mongoose');
const SubTopic = require('./models/SubTopic');
const GamifiedQuestion = require('./models/GamifiedQuestion');

const seedCodingDecoding = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const subtopicId = '698571061e0c0caac68e26fb';
    const subtopic = await SubTopic.findById(subtopicId);
    
    if (!subtopic) {
      console.error('Subtopic not found');
      return;
    }

    const codingDecodingGame = {
      subTopicId: subtopic._id,
      title: 'Coding-Decoding Master Challenge',
      description: 'Crack 20 coded messages and patterns',
      difficulty: 'Hard',
      points: 40,
      gameType: 'LogicPuzzle',
      isMultiLevel: true,
      totalLevels: 20,
      hasTimer: true,
      totalTimeLimit: 1200,
      levels: [
        { levelNumber: 1, levelTitle: 'Letter Shift', questionType: 'MCQ', question: 'If CAT is coded as DBU, how is DOG coded?', options: [{ id: 'A', text: 'EPH', isCorrect: true }, { id: 'B', text: 'CPG', isCorrect: false }, { id: 'C', text: 'FQI', isCorrect: false }, { id: 'D', text: 'DOH', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'Each letter shifts by +1', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 2, levelTitle: 'Reverse Code', questionType: 'MCQ', question: 'If BOOK is coded as KOOB, how is PAGE coded?', options: [{ id: 'A', text: 'EGAP', isCorrect: true }, { id: 'B', text: 'PGAE', isCorrect: false }, { id: 'C', text: 'APEG', isCorrect: false }, { id: 'D', text: 'GEPA', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'Reverse the word', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 3, levelTitle: 'Number Code', questionType: 'MCQ', question: 'If A=1, B=2, C=3, what is the code for CAB?', options: [{ id: 'A', text: '312', isCorrect: true }, { id: 'B', text: '123', isCorrect: false }, { id: 'C', text: '321', isCorrect: false }, { id: 'D', text: '213', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'C=3, A=1, B=2', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 4, levelTitle: 'Double Shift', questionType: 'MCQ', question: 'If BAT is coded as DCW, how is FAN coded?', options: [{ id: 'A', text: 'HCP', isCorrect: true }, { id: 'B', text: 'GBO', isCorrect: false }, { id: 'C', text: 'EZM', isCorrect: false }, { id: 'D', text: 'FAN', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'Each letter shifts by +2', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 5, levelTitle: 'Vowel Code', questionType: 'MCQ', question: 'If vowels are coded as next vowel (A→E, E→I), how is BEAT coded?', options: [{ id: 'A', text: 'BIET', isCorrect: true }, { id: 'B', text: 'BEAT', isCorrect: false }, { id: 'C', text: 'BOAT', isCorrect: false }, { id: 'D', text: 'BIAT', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'E→I, A→E', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 6, levelTitle: 'Position Code', questionType: 'MCQ', question: 'If 1st and last letters swap, how is STAR coded?', options: [{ id: 'A', text: 'RTAS', isCorrect: true }, { id: 'B', text: 'STAR', isCorrect: false }, { id: 'C', text: 'RATS', isCorrect: false }, { id: 'D', text: 'TSAR', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'Swap S and R', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 7, levelTitle: 'Alternate Shift', questionType: 'MCQ', question: 'If alternate letters shift +1, how is ABCD coded?', options: [{ id: 'A', text: 'ABDE', isCorrect: true }, { id: 'B', text: 'BCDE', isCorrect: false }, { id: 'C', text: 'BBDD', isCorrect: false }, { id: 'D', text: 'ACCE', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'B and D shift, A and C stay', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 8, levelTitle: 'Mirror Code', questionType: 'MCQ', question: 'If A↔Z, B↔Y, C↔X, how is BAD coded?', options: [{ id: 'A', text: 'YZW', isCorrect: true }, { id: 'B', text: 'BAD', isCorrect: false }, { id: 'C', text: 'ZYX', isCorrect: false }, { id: 'D', text: 'ABC', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'B→Y, A→Z, D→W', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 9, levelTitle: 'Skip Pattern', questionType: 'MCQ', question: 'If every 2nd letter is removed, how is CODING coded?', options: [{ id: 'A', text: 'CDN', isCorrect: true }, { id: 'B', text: 'OIG', isCorrect: false }, { id: 'C', text: 'CDIG', isCorrect: false }, { id: 'D', text: 'COD', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'Keep C, D, N (positions 1,3,5)', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 10, levelTitle: 'Sum Code', questionType: 'MCQ', question: 'If A=1, B=2, what is sum code for CAT?', options: [{ id: 'A', text: '24', isCorrect: true }, { id: 'B', text: '15', isCorrect: false }, { id: 'C', text: '30', isCorrect: false }, { id: 'D', text: '18', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'C(3) + A(1) + T(20) = 24', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 11, levelTitle: 'Triple Shift', questionType: 'MCQ', question: 'If each letter shifts +3, how is BOX coded?', options: [{ id: 'A', text: 'ERA', isCorrect: true }, { id: 'B', text: 'CPY', isCorrect: false }, { id: 'C', text: 'ANY', isCorrect: false }, { id: 'D', text: 'BOX', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'B+3=E, O+3=R, X+3=A', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 12, levelTitle: 'Consonant Code', questionType: 'MCQ', question: 'If consonants shift +1, vowels stay, how is MAKE coded?', options: [{ id: 'A', text: 'NALF', isCorrect: true }, { id: 'B', text: 'MAKE', isCorrect: false }, { id: 'C', text: 'MBLF', isCorrect: false }, { id: 'D', text: 'NAKE', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'M→N, K→L, F→F, vowels stay', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 13, levelTitle: 'Pair Swap', questionType: 'MCQ', question: 'If pairs swap (AB→BA), how is ABCD coded?', options: [{ id: 'A', text: 'BADC', isCorrect: true }, { id: 'B', text: 'DCBA', isCorrect: false }, { id: 'C', text: 'ABCD', isCorrect: false }, { id: 'D', text: 'CDAB', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'AB→BA, CD→DC', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 14, levelTitle: 'Position Value', questionType: 'MCQ', question: 'If position × 2, what is code for ABC?', options: [{ id: 'A', text: '2-4-6', isCorrect: true }, { id: 'B', text: '1-2-3', isCorrect: false }, { id: 'C', text: '3-6-9', isCorrect: false }, { id: 'D', text: '4-8-12', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'A(1)×2=2, B(2)×2=4, C(3)×2=6', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 15, levelTitle: 'Reverse Shift', questionType: 'MCQ', question: 'If letters shift -1, how is ZOO coded?', options: [{ id: 'A', text: 'YNN', isCorrect: true }, { id: 'B', text: 'APP', isCorrect: false }, { id: 'C', text: 'ZOO', isCorrect: false }, { id: 'D', text: 'XMM', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'Z-1=Y, O-1=N', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 16, levelTitle: 'Mixed Pattern', questionType: 'MCQ', question: 'If 1st letter +1, 2nd letter -1, how is AB coded?', options: [{ id: 'A', text: 'BA', isCorrect: true }, { id: 'B', text: 'BC', isCorrect: false }, { id: 'C', text: 'AB', isCorrect: false }, { id: 'D', text: 'AA', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'A+1=B, B-1=A', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 17, levelTitle: 'Word Value', questionType: 'MCQ', question: 'If word value = sum of positions, what is value of BAD?', options: [{ id: 'A', text: '7', isCorrect: true }, { id: 'B', text: '6', isCorrect: false }, { id: 'C', text: '8', isCorrect: false }, { id: 'D', text: '9', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'B(2) + A(1) + D(4) = 7', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 18, levelTitle: 'Complex Shift', questionType: 'MCQ', question: 'If position n shifts by +n, how is ABC coded?', options: [{ id: 'A', text: 'BDF', isCorrect: true }, { id: 'B', text: 'BCD', isCorrect: false }, { id: 'C', text: 'CDE', isCorrect: false }, { id: 'D', text: 'ABC', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'A+1=B, B+2=D, C+3=F', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 19, levelTitle: 'Cipher Code', questionType: 'MCQ', question: 'If A→Z, B→Y, C→X (reverse alphabet), how is CAB coded?', options: [{ id: 'A', text: 'XZY', isCorrect: true }, { id: 'B', text: 'ZYX', isCorrect: false }, { id: 'C', text: 'CAB', isCorrect: false }, { id: 'D', text: 'ABC', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'C→X, A→Z, B→Y', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true },
        { levelNumber: 20, levelTitle: 'Ultimate Cipher', questionType: 'MCQ', question: 'If vowels reverse, consonants +2, how is BEAT coded?', options: [{ id: 'A', text: 'DIET', isCorrect: true }, { id: 'B', text: 'BEAT', isCorrect: false }, { id: 'C', text: 'DGCV', isCorrect: false }, { id: 'D', text: 'BIAT', isCorrect: false }], correctAnswer: 'A', hints: [{ hintNumber: 1, hintText: 'B+2=D, E→I, A→E, T+2=V but T stays', pointsDeduction: 1 }], pointsForLevel: 2, shuffleOptions: true }
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
      tags: ['Logic', 'Coding-Decoding', 'Patterns'],
      order: 3
    };

    const existingGame = await GamifiedQuestion.findOne({
      subTopicId: subtopic._id,
      title: codingDecodingGame.title
    });

    if (existingGame) {
      console.log('Coding-Decoding game already exists, skipping...');
    } else {
      await GamifiedQuestion.create(codingDecodingGame);
      console.log('✅ Created Coding-Decoding Master Challenge with 20 levels');
    }

    console.log('\n🎮 Seed completed successfully!');
    console.log(`Subtopic: ${subtopic.title}`);
    console.log(`Game: Coding-Decoding Master Challenge (20 levels)`);

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

seedCodingDecoding();

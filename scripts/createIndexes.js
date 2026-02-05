const mongoose = require('mongoose');
require('dotenv').config();

const createIndexes = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;

    // Helper function to create index safely
    const createIndexSafely = async (collection, indexSpec, options = {}) => {
      try {
        await db.collection(collection).createIndex(indexSpec, options);
        console.log(`✓ Created index on ${collection}:`, indexSpec);
      } catch (error) {
        if (error.code === 86) { // IndexKeySpecsConflict
          console.log(`- Index already exists on ${collection}:`, indexSpec);
        } else {
          console.error(`✗ Error creating index on ${collection}:`, error.message);
        }
      }
    };

    // Assessment Attempts indexes - Optimized for leaderboard queries
    await createIndexSafely('assessmentattempts', { student: 1, attemptStatus: 1 });
    await createIndexSafely('assessmentattempts', { student: 1, createdAt: -1 });
    await createIndexSafely('assessmentattempts', { assessment: 1, student: 1 });
    await createIndexSafely('assessmentattempts', { attemptStatus: 1, overallPercentage: -1 });
    
    // Leaderboard-specific compound indexes for better performance
    await createIndexSafely('assessmentattempts', { 
      attemptStatus: 1, 
      student: 1, 
      overallPercentage: -1,
      completedAt: -1
    });
    
    // Index for aggregation pipeline optimization
    await createIndexSafely('assessmentattempts', { 
      attemptStatus: 1, 
      overallPercentage: -1 
    });

    // Students indexes for leaderboard lookups
    await createIndexSafely('students', { _id: 1, name: 1, email: 1 });

    // Practice Submissions indexes (keeping existing ones)
    await createIndexSafely('practicesubmissions', { studentId: 1, isSuccessful: 1 });
    await createIndexSafely('practicesubmissions', { studentId: 1, createdAt: -1 });
    await createIndexSafely('practicesubmissions', { studentId: 1, questionId: 1 });
    await createIndexSafely('practicesubmissions', { isSuccessful: 1, coins: 1 });
    await createIndexSafely('practicesubmissions', { 
      studentId: 1, 
      isSuccessful: 1, 
      coins: -1 
    });

    // Quiz Attempts indexes (keeping existing ones)
    await createIndexSafely('quizattempts', { studentId: 1, attemptStatus: 1 });
    await createIndexSafely('quizattempts', { studentId: 1, createdAt: -1 });
    await createIndexSafely('quizattempts', { quizId: 1, studentId: 1 });
    await createIndexSafely('quizattempts', { attemptStatus: 1, score: 1 });
    await createIndexSafely('quizattempts', { 
      studentId: 1, 
      attemptStatus: 1, 
      score: -1 
    });

    console.log('\n✅ All indexes processed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error connecting to database:', error);
    process.exit(1);
  }
};

createIndexes();
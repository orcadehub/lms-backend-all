const Student = require('../models/Student');
const PracticeSubmission = require('../models/PracticeSubmission');
const QuizAttempt = require('../models/QuizAttempt');
const AssessmentAttempt = require('../models/AssessmentAttempt');

const leaderboardController = {
  // Get practice leaderboard based on total coins earned
  getPracticeLeaderboard: async (req, res) => {
    try {
      const practiceLeaderboard = await PracticeSubmission.aggregate([
        {
          $group: {
            _id: '$userId',
            totalCoins: { $sum: '$coinsEarned' },
            totalProblems: { $sum: 1 },
            completedProblems: {
              $sum: { $cond: ['$isCompleted', 1, 0] }
            }
          }
        },
        {
          $lookup: {
            from: 'students',
            localField: '_id',
            foreignField: '_id',
            as: 'student'
          }
        },
        {
          $unwind: '$student'
        },
        {
          $project: {
            _id: 1,
            name: '$student.name',
            email: '$student.email',
            totalCoins: 1,
            totalProblems: 1,
            completedProblems: 1
          }
        },
        {
          $sort: { totalCoins: -1 }
        },
        {
          $limit: 100
        }
      ]);

      // Add rank
      const rankedLeaderboard = practiceLeaderboard.map((student, index) => ({
        ...student,
        rank: index + 1
      }));

      res.json(rankedLeaderboard);
    } catch (error) {
      console.error('Error fetching practice leaderboard:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get quiz leaderboard based on average percentage
  getQuizLeaderboard: async (req, res) => {
    try {
      const quizLeaderboard = await QuizAttempt.aggregate([
        {
          $match: { attemptStatus: 'COMPLETED' }
        },
        {
          $group: {
            _id: '$student',
            totalQuizzes: { $sum: 1 },
            totalScore: { $sum: '$score' },
            totalQuestions: { $sum: '$totalQuestions' }
          }
        },
        {
          $addFields: {
            averagePercentage: {
              $cond: [
                { $gt: ['$totalQuestions', 0] },
                { $multiply: [{ $divide: ['$totalScore', '$totalQuestions'] }, 100] },
                0
              ]
            }
          }
        },
        {
          $lookup: {
            from: 'students',
            localField: '_id',
            foreignField: '_id',
            as: 'student'
          }
        },
        {
          $unwind: '$student'
        },
        {
          $project: {
            _id: 1,
            name: '$student.name',
            email: '$student.email',
            totalQuizzes: 1,
            averagePercentage: { $round: ['$averagePercentage', 2] }
          }
        },
        {
          $sort: { averagePercentage: -1 }
        },
        {
          $limit: 100
        }
      ]);

      // Add rank
      const rankedLeaderboard = quizLeaderboard.map((student, index) => ({
        ...student,
        rank: index + 1
      }));

      res.json(rankedLeaderboard);
    } catch (error) {
      console.error('Error fetching quiz leaderboard:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get assessment leaderboard based on average percentage
  getAssessmentLeaderboard: async (req, res) => {
    try {
      const assessmentLeaderboard = await AssessmentAttempt.aggregate([
        {
          $match: { attemptStatus: 'COMPLETED' }
        },
        {
          $group: {
            _id: '$student',
            totalAssessments: { $sum: 1 },
            totalPercentage: { $sum: '$overallPercentage' }
          }
        },
        {
          $addFields: {
            averagePercentage: {
              $cond: [
                { $gt: ['$totalAssessments', 0] },
                { $divide: ['$totalPercentage', '$totalAssessments'] },
                0
              ]
            }
          }
        },
        {
          $lookup: {
            from: 'students',
            localField: '_id',
            foreignField: '_id',
            as: 'student'
          }
        },
        {
          $unwind: '$student'
        },
        {
          $project: {
            _id: 1,
            name: '$student.name',
            email: '$student.email',
            totalAssessments: 1,
            averagePercentage: { $round: ['$averagePercentage', 2] }
          }
        },
        {
          $sort: { averagePercentage: -1 }
        },
        {
          $limit: 100
        }
      ]);

      // Add rank
      const rankedLeaderboard = assessmentLeaderboard.map((student, index) => ({
        ...student,
        rank: index + 1
      }));

      res.json(rankedLeaderboard);
    } catch (error) {
      console.error('Error fetching assessment leaderboard:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get overall leaderboard combining all three categories
  getOverallLeaderboard: async (req, res) => {
    try {
      // Get all students with their performance data
      const students = await Student.find({}, { name: 1, email: 1 });
      
      const overallLeaderboard = await Promise.all(
        students.map(async (student) => {
          // Practice data
          const practiceData = await PracticeSubmission.aggregate([
            { $match: { userId: student._id } },
            {
              $group: {
                _id: null,
                totalCoins: { $sum: '$coinsEarned' },
                completedProblems: { $sum: { $cond: ['$isCompleted', 1, 0] } }
              }
            }
          ]);

          // Quiz data
          const quizData = await QuizAttempt.aggregate([
            { $match: { student: student._id, attemptStatus: 'COMPLETED' } },
            {
              $group: {
                _id: null,
                totalQuizzes: { $sum: 1 },
                totalScore: { $sum: '$score' },
                totalQuestions: { $sum: '$totalQuestions' }
              }
            }
          ]);

          // Assessment data
          const assessmentData = await AssessmentAttempt.aggregate([
            { $match: { student: student._id, attemptStatus: 'COMPLETED' } },
            {
              $group: {
                _id: null,
                totalAssessments: { $sum: 1 },
                totalPercentage: { $sum: '$overallPercentage' }
              }
            }
          ]);

          const practice = practiceData[0] || { totalCoins: 0, completedProblems: 0 };
          const quiz = quizData[0] || { totalQuizzes: 0, totalScore: 0, totalQuestions: 0 };
          const assessment = assessmentData[0] || { totalAssessments: 0, totalPercentage: 0 };

          const quizAverage = quiz.totalQuestions > 0 ? (quiz.totalScore / quiz.totalQuestions) * 100 : 0;
          const assessmentAverage = assessment.totalAssessments > 0 ? assessment.totalPercentage / assessment.totalAssessments : 0;

          // Calculate overall score (weighted combination)
          const practiceScore = practice.totalCoins * 0.3; // 30% weight
          const quizScore = quizAverage * 0.35; // 35% weight
          const assessmentScore = assessmentAverage * 0.35; // 35% weight
          const overallScore = practiceScore + quizScore + assessmentScore;

          return {
            _id: student._id,
            name: student.name,
            email: student.email,
            practiceCoins: practice.totalCoins,
            completedProblems: practice.completedProblems,
            quizAverage: Math.round(quizAverage * 100) / 100,
            totalQuizzes: quiz.totalQuizzes,
            assessmentAverage: Math.round(assessmentAverage * 100) / 100,
            totalAssessments: assessment.totalAssessments,
            overallScore: Math.round(overallScore * 100) / 100
          };
        })
      );

      // Sort by overall score and add rank
      const rankedLeaderboard = overallLeaderboard
        .sort((a, b) => b.overallScore - a.overallScore)
        .slice(0, 100)
        .map((student, index) => ({
          ...student,
          rank: index + 1
        }));

      res.json(rankedLeaderboard);
    } catch (error) {
      console.error('Error fetching overall leaderboard:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = leaderboardController;
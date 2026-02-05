const Student = require('../models/Student');
const AssessmentAttempt = require('../models/AssessmentAttempt');

const leaderboardController = {
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
          $limit: 30
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

  // Get overall leaderboard based on assessment performance only
  getOverallLeaderboard: async (req, res) => {
    try {
      // Use optimized aggregation pipeline for better performance
      const overallLeaderboard = await AssessmentAttempt.aggregate([
        {
          $match: { attemptStatus: 'COMPLETED' }
        },
        {
          $group: {
            _id: '$student',
            totalAssessments: { $sum: 1 },
            totalPercentage: { $sum: '$overallPercentage' },
            lastAttempt: { $max: '$completedAt' }
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
            averagePercentage: { $round: ['$averagePercentage', 2] },
            lastAttempt: 1
          }
        },
        {
          $sort: { averagePercentage: -1, totalAssessments: -1 }
        },
        {
          $limit: 30
        }
      ]);

      // Add rank
      const rankedLeaderboard = overallLeaderboard.map((student, index) => ({
        ...student,
        rank: index + 1,
        overallScore: student.averagePercentage // Use assessment percentage as overall score
      }));

      res.json(rankedLeaderboard);
    } catch (error) {
      console.error('Error fetching overall leaderboard:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = leaderboardController;
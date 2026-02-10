const Student = require('../models/Student');
const AssessmentAttempt = require('../models/AssessmentAttempt');
const mongoose = require('mongoose');

const leaderboardController = {
  // Get assessment leaderboard based on average percentage
  getAssessmentLeaderboard: async (req, res) => {
    try {
      const tenantIdString = req.query.tenantId;
      const studentEmail = req.query.email;
      if (!tenantIdString) {
        return res.status(400).json({ message: 'Tenant ID is required' });
      }
      const studentTenantId = new mongoose.Types.ObjectId(tenantIdString);
      
      // Extract domain from student email
      let emailDomain = null;
      if (studentEmail) {
        emailDomain = studentEmail.split('@')[1];
      }
      
      console.log('Fetching assessment leaderboard for tenant:', studentTenantId, 'domain:', emailDomain);
      
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
          $match: {
            $expr: { $eq: ['$student.tenant', studentTenantId] },
            ...(emailDomain && { 'student.email': { $regex: `@${emailDomain}$`, $options: 'i' } })
          }
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

      console.log('Assessment leaderboard results:', assessmentLeaderboard.length);

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
      const tenantIdString = req.query.tenantId;
      const studentEmail = req.query.email;
      if (!tenantIdString) {
        return res.status(400).json({ message: 'Tenant ID is required' });
      }
      const studentTenantId = new mongoose.Types.ObjectId(tenantIdString);
      
      // Extract domain from student email
      let emailDomain = null;
      if (studentEmail) {
        emailDomain = studentEmail.split('@')[1];
      }
      
      console.log('Fetching overall leaderboard for tenant:', studentTenantId, 'domain:', emailDomain);
      
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
          $match: {
            $expr: { $eq: ['$student.tenant', studentTenantId] },
            ...(emailDomain && { 'student.email': { $regex: `@${emailDomain}$`, $options: 'i' } })
          }
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

      console.log('Overall leaderboard results:', overallLeaderboard.length);

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

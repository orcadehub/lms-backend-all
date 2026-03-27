const Student = require('../models/Student');
const AssessmentAttempt = require('../models/AssessmentAttempt');
const ProgrammingQuestion = require('../models/ProgrammingQuestion');
const PracticeSubmission = require('../models/PracticeSubmission');
const mongoose = require('mongoose');

const leaderboardController = {
  // Get leaderboard based on total problems solved across all platforms
  getOverallLeaderboard: async (req, res) => {
    try {
      const userEmail = req.query.email;
      const limit = parseInt(req.query.limit) || 1000;
      
      if (!userEmail) {
        return res.status(400).json({ message: 'Email is required' });
      }
      
      const emailDomain = userEmail.split('@')[1];
      const query = { isActive: true, email: { $regex: `@${emailDomain}$`, $options: 'i' } };
      
      const students = await Student.find(query)
        .select('name email codingProfiles')
        .limit(limit)
        .lean();

      // Get practice solved counts for all students in this domain
      const practiceStats = await PracticeSubmission.aggregate([
        { $match: { isCompleted: true } },
        { $group: { _id: '$userId', solvedCount: { $sum: 1 } } }
      ]);

      const practiceMap = {};
      practiceStats.forEach(stat => {
        practiceMap[stat._id.toString()] = stat.solvedCount;
      });
      
      const leaderboardData = students.map(student => {
        const profiles = student.codingProfiles || {};
        const appSolved = practiceMap[student._id.toString()] || 0;
        const totalSolved = 
          (profiles.leetcode?.totalSolved || 0) +
          (profiles.hackerrank?.totalSolved || 0) +
          (profiles.codeforces?.totalSolved || 0) +
          appSolved;
        
        return {
          _id: student._id,
          name: student.name,
          email: student.email,
          totalSolved,
          leetcode: profiles.leetcode?.totalSolved || 0,
          hackerrank: profiles.hackerrank?.totalSolved || 0,
          codeforces: profiles.codeforces?.totalSolved || 0,
          leetcodeUsername: profiles.leetcode?.username,
          hackerrankUsername: profiles.hackerrank?.username,
          codeforcesUsername: profiles.codeforces?.username,
          appSolved
        };
      });
      
      // Sort by total solved
      leaderboardData.sort((a, b) => b.totalSolved - a.totalSolved);
      
      // Add rank
      const rankedData = leaderboardData.map((student, index) => ({
        ...student,
        rank: index + 1
      }));
      
      res.json({
        data: rankedData,
        total: rankedData.length
      });
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Keep old endpoints for backward compatibility
  getAssessmentLeaderboard: async (req, res) => {
    try {
      const tenantIdString = req.query.tenantId;
      const studentEmail = req.query.email;
      if (!tenantIdString) {
        return res.status(400).json({ message: 'Tenant ID is required' });
      }
      const studentTenantId = new mongoose.Types.ObjectId(tenantIdString);
      
      let emailDomain = null;
      if (studentEmail) {
        emailDomain = studentEmail.split('@')[1];
      }
      
      const assessmentLeaderboard = await AssessmentAttempt.aggregate([
        { $match: { attemptStatus: 'COMPLETED' } },
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
        { $unwind: '$student' },
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
        { $sort: { averagePercentage: -1 } },
        { $limit: 30 }
      ]);

      const rankedLeaderboard = assessmentLeaderboard.map((student, index) => ({
        ...student,
        rank: index + 1
      }));

      res.json(rankedLeaderboard);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = leaderboardController;
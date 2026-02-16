const AssessmentAttempt = require('../models/AssessmentAttempt');
const PracticeSubmission = require('../models/PracticeSubmission');
const Student = require('../models/Student');

exports.getDashboardData = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Get student data with coding profiles
    const student = await Student.findOne({ email: email.toLowerCase() }).select('name email createdAt codingProfiles profile');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const studentId = student._id;

    // Get completed assessments (coding assessments: totalProgrammingQuestions > 0)
    const assessments = await AssessmentAttempt.countDocuments({
      student: studentId,
      attemptStatus: 'COMPLETED',
      totalProgrammingQuestions: { $gt: 0 }
    });

    // Get completed quizzes (quizzes: totalProgrammingQuestions = 0)
    const quizzes = await AssessmentAttempt.countDocuments({
      student: studentId,
      attemptStatus: 'COMPLETED',
      totalProgrammingQuestions: 0
    });

    // Get completed practice problems
    const practice = await PracticeSubmission.countDocuments({
      userId: studentId,
      isCompleted: true
    });

    // Calculate accuracy from all completed assessments
    const completedAttempts = await AssessmentAttempt.find({
      student: studentId,
      attemptStatus: 'COMPLETED'
    }).select('accuracy');
    
    const accuracy = completedAttempts.length > 0
      ? completedAttempts.reduce((sum, a) => sum + (a.accuracy || 0), 0) / completedAttempts.length
      : 0;

    // Calculate overall percentage from all completed assessments
    const overallAttempts = await AssessmentAttempt.find({
      student: studentId,
      attemptStatus: 'COMPLETED'
    }).select('overallPercentage');
    
    const overall = overallAttempts.length > 0
      ? overallAttempts.reduce((sum, a) => sum + (a.overallPercentage || 0), 0) / overallAttempts.length
      : 0;

    // Calculate total problems solved across all platforms
    const appSolved = practice;
    const leetcodeSolved = student?.codingProfiles?.leetcode?.totalSolved || 0;
    const hackerrankSolved = student?.codingProfiles?.hackerrank?.totalSolved || 0;
    const codeforcesSolved = student?.codingProfiles?.codeforces?.totalSolved || 0;
    const totalSolved = appSolved + leetcodeSolved + hackerrankSolved + codeforcesSolved;

    // Get activity data for calendar (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const practiceActivity = await PracticeSubmission.aggregate([
      {
        $match: {
          userId: studentId,
          lastActivityAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$lastActivityAt' } },
          count: { $sum: 1 }
        }
      }
    ]);

    const assessmentActivity = await AssessmentAttempt.aggregate([
      {
        $match: {
          student: studentId,
          completedAt: { $gte: sixMonthsAgo, $ne: null }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$completedAt' } },
          count: { $sum: 1 }
        }
      }
    ]);

    // Merge activity data
    const activityData = {};
    practiceActivity.forEach(a => {
      activityData[a._id] = (activityData[a._id] || 0) + a.count;
    });
    assessmentActivity.forEach(a => {
      activityData[a._id] = (activityData[a._id] || 0) + a.count;
    });

    // Calculate rank (placeholder - implement based on your ranking logic)
    const rank = 0; // TODO: Implement ranking logic

    res.json({
      name: student?.name,
      email: student?.email,
      createdAt: student?.createdAt,
      profilePic: student?.profile?.profilePic,
      stats: {
        assessments,
        quizzes,
        practice,
        accuracy: Math.round(accuracy * 10) / 10,
        overall: Math.round(overall * 10) / 10,
        appSolved,
        rank
      },
      activityData,
      codingProfiles: student?.codingProfiles || {}
    });

  } catch (error) {
    console.error('Dashboard data error:', error);
    res.status(500).json({ message: error.message });
  }
};

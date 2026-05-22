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
    const student = await Student.findOne({ email: email.toLowerCase() }).select('name email createdAt codingProfiles profile loginHistory streak maxStreak');

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
    
    // Add login history to activity data
    if (student.loginHistory) {
      student.loginHistory.forEach(date => {
        if (date >= sixMonthsAgo) {
          const dateStr = date.toISOString().split('T')[0];
          activityData[dateStr] = (activityData[dateStr] || 0) + 1;
        }
      });
    }

    practiceActivity.forEach(a => {
      activityData[a._id] = (activityData[a._id] || 0) + a.count;
    });
    assessmentActivity.forEach(a => {
      activityData[a._id] = (activityData[a._id] || 0) + a.count;
    });

    let localRank = 0;
    let globalRank = 0;
    try {
      const emailDomain = email.split('@')[1];
      const students = await Student.find({ isActive: true })
        .select('_id email codingProfiles')
        .lean();

      const practiceStats = await PracticeSubmission.aggregate([
        { $match: { isCompleted: true } },
        { $group: { _id: '$userId', solvedCount: { $sum: 1 } } }
      ]);
      const practiceMap = {};
      practiceStats.forEach(stat => {
        practiceMap[stat._id.toString()] = stat.solvedCount;
      });

      let localLeaderboard = [];
      let globalLeaderboard = [];

      students.forEach(s => {
        const profiles = s.codingProfiles || {};
        const appS = practiceMap[s._id.toString()] || 0;
        const totalSolved = (profiles.leetcode?.totalSolved || 0) + 
                            (profiles.hackerrank?.totalSolved || 0) + 
                            (profiles.codeforces?.totalSolved || 0) + 
                            appS;
        
        const entry = { id: s._id.toString(), totalSolved };
        globalLeaderboard.push(entry);
        
        if (s.email && s.email.toLowerCase().endsWith(`@${emailDomain}`)) {
          localLeaderboard.push(entry);
        }
      });

      globalLeaderboard.sort((a, b) => b.totalSolved - a.totalSolved);
      localLeaderboard.sort((a, b) => b.totalSolved - a.totalSolved);

      const globalUserIndex = globalLeaderboard.findIndex(s => s.id === studentId.toString());
      const localUserIndex = localLeaderboard.findIndex(s => s.id === studentId.toString());

      globalRank = globalUserIndex !== -1 ? globalUserIndex + 1 : 0;
      localRank = localUserIndex !== -1 ? localUserIndex + 1 : 0;
    } catch(err) {
      console.error('Rank calculation error:', err);
    }
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
        rank: localRank,
        globalRank,
        streak: student?.streak || 0,
        maxStreak: student?.maxStreak || 0
      },
      activityData,
      codingProfiles: student?.codingProfiles || {}
    });

  } catch (error) {
    console.error('Dashboard data error:', error);
    res.status(500).json({ message: error.message });
  }
};

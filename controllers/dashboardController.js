const AssessmentAttempt = require('../models/AssessmentAttempt');
const PracticeSubmission = require('../models/PracticeSubmission');
const Student = require('../models/Student');
const Tenant = require('../models/Tenant');
const Instructor = require('../models/Instructor');
const Assessment = require('../models/Assessment');
const Course = require('../models/Course');
const Batch = require('../models/Batch');
const Certificate = require('../models/Certificate');
const LmsRequest = require('../models/LmsRequest');
const Topic = require('../models/Topic');
const QuizQuestion = require('../models/QuizQuestion');
const { buildStudentScope, ensureInstructorTenantAccess } = require('../utils/studentAccess');

const withStudentActivityFilter = (scope, activityOr) => {
  const query = { ...scope };
  if (query.$or) {
    const scopeOr = query.$or;
    delete query.$or;
    query.$and = [...(query.$and || []), { $or: scopeOr }, { $or: activityOr }];
  } else {
    query.$or = activityOr;
  }
  return query;
};

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

exports.getAdminStats = async (req, res) => {
  try {
    const [
      totalStudents,
      totalTenants,
      activeTenants,
      totalAssessments,
      totalInstructors,
      totalCourses,
      totalBatches,
      totalCertificates,
      pendingLmsRequests,
      totalPracticeTopics,
      totalQuizQuestions,
      recentStudents
    ] = await Promise.all([
      Student.countDocuments(),
      Tenant.countDocuments(),
      Tenant.countDocuments({ isActive: true }),
      Assessment.countDocuments(),
      Instructor.countDocuments(),
      Course.countDocuments(),
      Batch.countDocuments(),
      Certificate.countDocuments(),
      LmsRequest.countDocuments({ status: 'pending' }),
      Topic.countDocuments(),
      QuizQuestion.countDocuments(),
      Student.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
      })
    ]);

    res.json({
      students: { total: totalStudents, newLast30Days: recentStudents },
      tenants: { total: totalTenants, active: activeTenants },
      assessments: { total: totalAssessments },
      instructors: { total: totalInstructors },
      courses: { total: totalCourses },
      batches: { total: totalBatches },
      certificates: { total: totalCertificates },
      lmsRequests: { pending: pendingLmsRequests },
      practice: { topics: totalPracticeTopics },
      quizzes: { questions: totalQuizQuestions }
    });
  } catch (error) {
    console.error('Admin dashboard stats error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getInstructorStats = async (req, res) => {
  try {
    const tenantId = req.headers['x-tenant-id'];
    const { batch } = req.query;
    if (req.user.role === 'instructor') {
      await ensureInstructorTenantAccess(req.user, tenantId);
    }
    
    let tenantQuery = tenantId ? await buildStudentScope(req.user, tenantId) : {};
    let tenantIdQuery = tenantId ? { tenantId: tenantId } : {};
    const instructorQuery = tenantId ? { assignedTenants: tenantId } : {};

    if (batch && batch !== 'all') {
      const batchDoc = await Batch.findOne({ tenant: tenantId, name: batch }).lean();
      if (batchDoc) {
        tenantQuery = {
          ...tenantQuery,
          _id: { $in: (batchDoc.students || []).map(id => id.toString()) }
        };
        tenantIdQuery = {
          ...tenantIdQuery,
          batches: batchDoc._id
        };
      } else {
        tenantQuery = { ...tenantQuery, _id: { $in: [] } };
        tenantIdQuery = { ...tenantIdQuery, _id: null };
      }
    }

    // Get all students for the tenant to calculate institutions by unique email domains
    const students = await Student.find(tenantQuery).select('email').lean();
    const uniqueDomains = new Set();
    students.forEach(s => {
      if (s.email && s.email.includes('@')) {
        const domain = s.email.split('@')[1].toLowerCase();
        uniqueDomains.add(domain);
      }
    });
    const totalInstitutions = uniqueDomains.size;
    const totalStudents = students.length;

    const [
      totalAssessments,
      totalPracticeQuestions,
      totalCourses,
      totalInstructors,
      totalAptitude
    ] = await Promise.all([
      Assessment.countDocuments(tenantIdQuery),
      Topic.countDocuments(tenantId ? { tenant: tenantId } : {}),
      Course.countDocuments(tenantId ? { tenant: tenantId } : {}),
      Instructor.countDocuments(instructorQuery),
      QuizQuestion.countDocuments(tenantId ? { tenant: tenantId } : {})
    ]);

    res.json({
      students: totalStudents,
      institutions: totalInstitutions,
      assessments: totalAssessments,
      practiceQuestions: totalPracticeQuestions,
      courses: totalCourses,
      instructors: totalInstructors,
      aptitude: totalAptitude
    });
  } catch (error) {
    console.error('Instructor dashboard stats error:', error);
    res.status(500).json({ message: error.message });
  }
};
exports.getInstructorAnalytics = async (req, res) => {
  try {
    const mongoose = require('mongoose');
    const GamifiedAttempt = require('../models/GamifiedAttempt');
    const MCQAttempt = require('../models/MCQAttempt');
    const LabSubmission = require('../models/LabSubmission');

    const tenantId = req.headers['x-tenant-id'];
    if (!tenantId) {
      return res.status(400).json({ message: 'Tenant ID is required' });
    }

    const { startDate, endDate, batch, institution, search } = req.query;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const studentQuery = await buildStudentScope(req.user, tenantId, institution && institution !== 'all' ? institution : undefined);
    
    // Filter students by batch
    if (batch && batch !== 'all') {
      const batchDoc = await Batch.findOne({ tenant: tenantId, name: batch });
      if (batchDoc) {
        const selectedBatchStudentIds = new Set((batchDoc.students || []).map((id) => String(id)));
        const scopedStudentIds = await Student.find(studentQuery).distinct('_id');
        studentQuery._id = { $in: scopedStudentIds.filter((id) => selectedBatchStudentIds.has(String(id))) };
      } else {
        studentQuery._id = { $in: [] }; // no match
      }
    }
    
    // Filter students by name/email search query
    if (search && search.trim() !== '') {
      const regex = new RegExp(search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      const existingOr = studentQuery.$or;
      delete studentQuery.$or;
      studentQuery.$and = [
        ...(studentQuery.$and || []),
        ...(existingOr ? [{ $or: existingOr }] : []),
        { $or: [{ name: regex }, { email: regex }] }
      ];
    }

    const students = await Student.find(studentQuery).select('_id name email profile codingProfiles').lean();
    const studentIds = students.map(s => s._id);
    const studentMap = {};
    students.forEach(s => { studentMap[s._id.toString()] = s; });

  // Batches & institutions — same sources as Student Management / Reports
    const tenantBatchesForFilters = await Batch.find({ tenant: tenantId, isActive: true }).select('name students').lean();
    const studentBatchMap = {};
    tenantBatchesForFilters.forEach((b) => {
      (b.students || []).forEach((sid) => {
        const id = sid.toString();
        if (!studentBatchMap[id]) studentBatchMap[id] = [];
        if (!studentBatchMap[id].includes(b.name)) studentBatchMap[id].push(b.name);
      });
    });

    const allTenantStudents = await Student.find(await buildStudentScope(req.user, tenantId)).select('email').lean();
    const institutionFilterOptions = [];
    const institutionDomainSet = new Set();
    allTenantStudents.forEach((s) => {
      if (s.email && s.email.includes('@')) {
        institutionDomainSet.add(s.email.split('@')[1].toLowerCase());
      }
    });
    institutionFilterOptions.push(...Array.from(institutionDomainSet).sort());

    const batchFilterOptions = tenantBatchesForFilters
      .map((b) => ({ _id: b._id, name: b.name }))
      .sort((a, b) => a.name.localeCompare(b.name));

    const orcaSolvedAgg = await PracticeSubmission.aggregate([
      { $match: { userId: { $in: studentIds }, isCompleted: true } },
      { $group: { _id: '$userId', totalSolved: { $sum: 1 } } }
    ]);
    const orcaMap = {};
    orcaSolvedAgg.forEach((r) => {
      orcaMap[r._id.toString()] = r.totalSolved;
    });

    let leetcodeConnectedCount = 0;
    let hackerrankConnectedCount = 0;
    let codechefConnectedCount = 0;
    let codeforcesConnectedCount = 0;
    let orcaConnectedCount = 0;
    let totalConnectedStudents = 0;

    const studentCodingProfilesList = [];

    students.forEach(s => {
      const cp = s.codingProfiles;
      const sid = s._id.toString();
      let hasAny = false;
      const profilesInfo = {
        leetcode: { connected: false, username: '', totalSolved: 0, ranking: 0 },
        hackerrank: { connected: false, username: '', totalSolved: 0, badges: 0 },
        codechef: { connected: false, username: '', rating: 0, globalRank: 0, stars: '0★' },
        codeforces: { connected: false, username: '', totalSolved: 0, rating: 0, rank: 'unrated' },
        orca: { connected: false, totalSolved: 0 }
      };

      if (cp) {
        if (cp.leetcode && cp.leetcode.connected && cp.leetcode.username) {
          leetcodeConnectedCount++;
          hasAny = true;
          profilesInfo.leetcode = {
            connected: true,
            username: cp.leetcode.username,
            totalSolved: cp.leetcode.totalSolved || 0,
            ranking: cp.leetcode.ranking || 0
          };
        }
        if (cp.hackerrank && cp.hackerrank.connected && cp.hackerrank.username) {
          hackerrankConnectedCount++;
          hasAny = true;
          profilesInfo.hackerrank = {
            connected: true,
            username: cp.hackerrank.username,
            totalSolved: cp.hackerrank.totalSolved || 0,
            badges: cp.hackerrank.badges || 0
          };
        }
        if (cp.codechef && cp.codechef.connected && cp.codechef.username) {
          codechefConnectedCount++;
          hasAny = true;
          profilesInfo.codechef = {
            connected: true,
            username: cp.codechef.username,
            rating: cp.codechef.rating || 0,
            globalRank: cp.codechef.globalRank || 0,
            stars: cp.codechef.stars || '0★'
          };
        }
        if (cp.codeforces && cp.codeforces.connected && cp.codeforces.username) {
          codeforcesConnectedCount++;
          hasAny = true;
          profilesInfo.codeforces = {
            connected: true,
            username: cp.codeforces.username,
            totalSolved: cp.codeforces.totalSolved || 0,
            rating: cp.codeforces.rating || 0,
            rank: cp.codeforces.rank || 'unrated'
          };
        }
      }

      const orcaSolved = orcaMap[sid] || 0;
      if (orcaSolved > 0) {
        orcaConnectedCount++;
        hasAny = true;
      }
      profilesInfo.orca = {
        connected: orcaSolved > 0,
        totalSolved: orcaSolved
      };

      const mergedBatches = Array.from(new Set([
        ...(studentBatchMap[sid] || []),
        ...(s.profile?.batch || [])
      ]));

      const institutionDomain = s.email && s.email.includes('@')
        ? s.email.split('@')[1].toLowerCase()
        : 'unknown';

      const totalQuestions =
        (profilesInfo.leetcode.totalSolved || 0) +
        (profilesInfo.hackerrank.totalSolved || 0) +
        (profilesInfo.codeforces.totalSolved || 0) +
        (profilesInfo.orca.totalSolved || 0);

      if (hasAny) totalConnectedStudents++;

      studentCodingProfilesList.push({
        _id: s._id,
        name: s.name,
        email: s.email,
        batches: mergedBatches,
        primaryBatch: mergedBatches[0] || '',
        institution: institutionDomain,
        totalQuestions,
        profiles: profilesInfo
      });
    });

    studentCodingProfilesList.sort((a, b) => b.totalQuestions - a.totalQuestions);

    const platformDistribution = [
      { platform: 'LeetCode', count: leetcodeConnectedCount, color: '#FFA116' },
      { platform: 'Codeforces', count: codeforcesConnectedCount, color: '#1F8EEA' },
      { platform: 'HackerRank', count: hackerrankConnectedCount, color: '#2EC866' },
      { platform: 'CodeChef', count: codechefConnectedCount, color: '#5B4636' },
      { platform: 'Orca', count: orcaConnectedCount, color: '#7e22ce' }
    ];

    const codingProfilesStats = {
      totalStudents: students.length,
      totalConnectedStudents,
      leetcodeCount: leetcodeConnectedCount,
      hackerrankCount: hackerrankConnectedCount,
      codechefCount: codechefConnectedCount,
      codeforcesCount: codeforcesConnectedCount,
      orcaCount: orcaConnectedCount
    };

    const codingFilterOptions = {
      batches: batchFilterOptions,
      institutions: institutionFilterOptions
    };

    // 1. KPI TODAY
    const activeStudentsScope = await buildStudentScope(req.user, tenantId);
    const activeStudentsToday = await Student.countDocuments(withStudentActivityFilter(activeStudentsScope, [
        { lastActiveAt: { $gte: startOfDay } },
        { updatedAt: { $gte: startOfDay } }
    ]));

    const submissionsToday = 
      await AssessmentAttempt.countDocuments({
        tenantId,
        student: { $in: studentIds },
        completedAt: { $gte: startOfDay },
        attemptStatus: { $in: ['COMPLETED', 'AUTO_SUBMITTED'] }
      }) +
      await PracticeSubmission.countDocuments({
        userId: { $in: studentIds },
        isCompleted: true,
        completedAt: { $gte: startOfDay }
      }) +
      await GamifiedAttempt.countDocuments({
        userId: { $in: studentIds },
        isCompleted: true,
        completedAt: { $gte: startOfDay }
      }) +
      await MCQAttempt.countDocuments({
        studentId: { $in: studentIds },
        timestamp: { $gte: startOfDay }
      });

    const assessmentScores = await AssessmentAttempt.find({
      tenantId,
      student: { $in: studentIds },
      completedAt: { $gte: startOfDay },
      attemptStatus: { $in: ['COMPLETED', 'AUTO_SUBMITTED'] }
    }).select('overallPercentage');

    const gamifiedScores = await GamifiedAttempt.find({
      userId: { $in: studentIds },
      isCompleted: true,
      completedAt: { $gte: startOfDay }
    }).select('accuracy');

    const mcqAttempts = await MCQAttempt.find({
      studentId: { $in: studentIds },
      timestamp: { $gte: startOfDay }
    }).select('isCorrect');

    let totalScoreSum = 0;
    let totalScoreCount = 0;

    assessmentScores.forEach(a => {
      totalScoreSum += a.overallPercentage || 0;
      totalScoreCount++;
    });
    gamifiedScores.forEach(g => {
      totalScoreSum += g.accuracy || 0;
      totalScoreCount++;
    });
    if (mcqAttempts.length > 0) {
      const mcqCorrect = mcqAttempts.filter(m => m.isCorrect).length;
      totalScoreSum += (mcqCorrect / mcqAttempts.length) * 100;
      totalScoreCount++;
    }

    const avgScoreToday = totalScoreCount > 0 ? Math.round((totalScoreSum / totalScoreCount) * 10) / 10 : 0;

    const certificatesToday = await Certificate.countDocuments({
      tenantId,
      student: { $in: studentIds },
      createdAt: { $gte: startOfDay }
    });

    const kpis = {
      activeStudentsToday: activeStudentsToday || 0,
      submissionsToday: submissionsToday || 0,
      avgScoreToday: avgScoreToday || 0,
      certificatesToday: certificatesToday || 0
    };

    // 2. DAILY ACTIVITY DISTRIBUTION
    const todayAttempts = await AssessmentAttempt.find({
      tenantId,
      student: { $in: studentIds },
      completedAt: { $gte: startOfDay },
      attemptStatus: { $in: ['COMPLETED', 'AUTO_SUBMITTED'] }
    }).select('completedAt student');

    const todayPrac = await PracticeSubmission.find({
      userId: { $in: studentIds },
      isCompleted: true,
      completedAt: { $gte: startOfDay }
    }).select('completedAt userId');

    const todayGam = await GamifiedAttempt.find({
      userId: { $in: studentIds },
      isCompleted: true,
      completedAt: { $gte: startOfDay }
    }).select('completedAt userId');

    const todayMcq = await MCQAttempt.find({
      studentId: { $in: studentIds },
      timestamp: { $gte: startOfDay }
    }).select('timestamp studentId');

    const hourlyMap = {
      '08:00 AM': 0, '10:00 AM': 0, '12:00 PM': 0, '02:00 PM': 0,
      '04:00 PM': 0, '06:00 PM': 0, '08:00 PM': 0, '10:00 PM': 0
    };

    const hourlyUniqueActiveMap = {
      '08:00 AM': new Set(), '10:00 AM': new Set(), '12:00 PM': new Set(), '02:00 PM': new Set(),
      '04:00 PM': new Set(), '06:00 PM': new Set(), '08:00 PM': new Set(), '10:00 PM': new Set()
    };

    const getHourBucket = (date) => {
      if (!date) return '10:00 PM';
      const hour = date.getHours();
      if (hour >= 8 && hour < 10) return '08:00 AM';
      else if (hour >= 10 && hour < 12) return '10:00 AM';
      else if (hour >= 12 && hour < 14) return '12:00 PM';
      else if (hour >= 14 && hour < 16) return '02:00 PM';
      else if (hour >= 16 && hour < 18) return '04:00 PM';
      else if (hour >= 18 && hour < 20) return '06:00 PM';
      else if (hour >= 20 && hour < 22) return '08:00 PM';
      else return '10:00 PM';
    };

    todayAttempts.forEach(att => {
      if (att.completedAt) {
        const bucket = getHourBucket(att.completedAt);
        hourlyMap[bucket]++;
        if (att.student) hourlyUniqueActiveMap[bucket].add(att.student.toString());
      }
    });
    todayPrac.forEach(att => {
      if (att.completedAt) {
        const bucket = getHourBucket(att.completedAt);
        hourlyMap[bucket]++;
        if (att.userId) hourlyUniqueActiveMap[bucket].add(att.userId.toString());
      }
    });
    todayGam.forEach(att => {
      if (att.completedAt) {
        const bucket = getHourBucket(att.completedAt);
        hourlyMap[bucket]++;
        if (att.userId) hourlyUniqueActiveMap[bucket].add(att.userId.toString());
      }
    });
    todayMcq.forEach(att => {
      if (att.timestamp) {
        const bucket = getHourBucket(att.timestamp);
        hourlyMap[bucket]++;
        if (att.studentId) hourlyUniqueActiveMap[bucket].add(att.studentId.toString());
      }
    });

    const hourlyDistribution = Object.keys(hourlyMap).map(hour => ({
      hour,
      Active: hourlyUniqueActiveMap[hour].size,
      Submissions: hourlyMap[hour]
    }));

    // 3. CALENDAR-BASED TREND DATA
    const queryStart = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const queryEnd = endDate ? new Date(endDate + 'T23:59:59.999Z') : new Date();

    const rangeAttempts = await AssessmentAttempt.find({
      tenantId,
      student: { $in: studentIds },
      completedAt: { $gte: queryStart, $lte: queryEnd },
      attemptStatus: { $in: ['COMPLETED', 'AUTO_SUBMITTED'] }
    }).select('completedAt overallPercentage');

    const rangePrac = await PracticeSubmission.find({
      userId: { $in: studentIds },
      isCompleted: true,
      completedAt: { $gte: queryStart, $lte: queryEnd }
    }).select('completedAt');

    const rangeGam = await GamifiedAttempt.find({
      userId: { $in: studentIds },
      isCompleted: true,
      completedAt: { $gte: queryStart, $lte: queryEnd }
    }).select('completedAt accuracy');

    const rangeMcq = await MCQAttempt.find({
      studentId: { $in: studentIds },
      timestamp: { $gte: queryStart, $lte: queryEnd }
    }).select('timestamp isCorrect');

    const calendarMap = {};
    const updateCalMap = (dateStr, score, countInc) => {
      if (!calendarMap[dateStr]) {
        calendarMap[dateStr] = { sum: 0, count: 0, completions: 0 };
      }
      if (score !== null) {
        calendarMap[dateStr].sum += score;
        calendarMap[dateStr].count++;
      }
      calendarMap[dateStr].completions += countInc;
    };

    rangeAttempts.forEach(att => {
      if (att.completedAt) {
        const dStr = att.completedAt.toLocaleDateString([], { month: 'short', day: 'numeric' });
        updateCalMap(dStr, att.overallPercentage || 0, 1);
      }
    });
    rangePrac.forEach(att => {
      if (att.completedAt) {
        const dStr = att.completedAt.toLocaleDateString([], { month: 'short', day: 'numeric' });
        updateCalMap(dStr, 100, 1);
      }
    });
    rangeGam.forEach(att => {
      if (att.completedAt) {
        const dStr = att.completedAt.toLocaleDateString([], { month: 'short', day: 'numeric' });
        updateCalMap(dStr, att.accuracy || 0, 1);
      }
    });
    rangeMcq.forEach(att => {
      if (att.timestamp) {
        const dStr = att.timestamp.toLocaleDateString([], { month: 'short', day: 'numeric' });
        updateCalMap(dStr, att.isCorrect ? 100 : 0, 1);
      }
    });

    const calendarData = [];
    const tempDate = new Date(queryStart);
    while (tempDate <= queryEnd) {
      const dateStr = tempDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
      const stats = calendarMap[dateStr];
      calendarData.push({
        date: dateStr,
        AvgScore: stats && stats.count > 0 ? Math.round((stats.sum / stats.count) * 10) / 10 : 0,
        Completion: stats ? stats.completions : 0
      });
      tempDate.setDate(tempDate.getDate() + 1);
      if (calendarData.length > 60) break;
    }

    // 3b. RANGE-BASED KPIS (Calendar Trends range)
    const activeStudentsRangeScope = await buildStudentScope(req.user, tenantId);
    const activeStudentsRange = await Student.countDocuments(withStudentActivityFilter(activeStudentsRangeScope, [
        { lastActiveAt: { $gte: queryStart, $lte: queryEnd } },
        { updatedAt: { $gte: queryStart, $lte: queryEnd } }
    ]));

    const submissionsRange = rangeAttempts.length + rangePrac.length + rangeGam.length + rangeMcq.length;

    let rangeScoreSum = 0;
    let rangeScoreCount = 0;
    rangeAttempts.forEach(a => {
      rangeScoreSum += a.overallPercentage || 0;
      rangeScoreCount++;
    });
    rangeGam.forEach(g => {
      rangeScoreSum += g.accuracy || 0;
      rangeScoreCount++;
    });
    if (rangeMcq.length > 0) {
      const mcqCorrect = rangeMcq.filter(m => m.isCorrect).length;
      rangeScoreSum += (mcqCorrect / rangeMcq.length) * 100;
      rangeScoreCount++;
    }
    const avgScoreRange = rangeScoreCount > 0 ? Math.round((rangeScoreSum / rangeScoreCount) * 10) / 10 : 0;

    const certificatesRange = await Certificate.countDocuments({
      tenantId,
      student: { $in: studentIds },
      createdAt: { $gte: queryStart, $lte: queryEnd }
    });

    const rangeKpis = {
      activeStudentsRange: activeStudentsRange || 0,
      submissionsRange: submissionsRange || 0,
      avgScoreRange: avgScoreRange || 0,
      certificatesRange: certificatesRange || 0
    };

    // 4. BATCH PERFORMANCE
    const allLabSubmissions = await LabSubmission.find({
      studentId: { $in: studentIds },
      status: { $in: ['submitted', 'passed'] }
    }).select('studentId score createdAt submittedAt').lean();

    const studentLabSubmissionsMap = {};
    allLabSubmissions.forEach(ls => {
      const sid = ls.studentId.toString();
      if (!studentLabSubmissionsMap[sid]) studentLabSubmissionsMap[sid] = [];
      studentLabSubmissionsMap[sid].push({
        score: ls.score || 0,
        date: ls.submittedAt || ls.createdAt || new Date(0)
      });
    });

    const tenantBatches = await Batch.find({ tenant: tenantId }).populate('students', 'email').lean();
    const batchAnalysis = [];

    for (const b of tenantBatches) {
      const scopedStudentIdSet = new Set(studentIds.map((id) => String(id)));
      const bStudentIds = b.students ? b.students.map(s => s._id).filter((id) => scopedStudentIdSet.has(String(id))) : [];

      const bAttempts = await AssessmentAttempt.find({
        student: { $in: bStudentIds },
        attemptStatus: { $in: ['COMPLETED', 'AUTO_SUBMITTED'] }
      }).select('overallPercentage');

      const bGam = await GamifiedAttempt.find({
        userId: { $in: bStudentIds },
        isCompleted: true
      }).select('accuracy');

      const bMcq = await MCQAttempt.find({
        studentId: { $in: bStudentIds }
      }).select('isCorrect');

      let bSum = 0;
      let bCount = 0;
      bAttempts.forEach(a => { bSum += a.overallPercentage || 0; bCount++; });
      bGam.forEach(g => { bSum += g.accuracy || 0; bCount++; });
      if (bMcq.length > 0) {
        const mcqCorrect = bMcq.filter(m => m.isCorrect).length;
        bSum += (mcqCorrect / bMcq.length) * 100;
        bCount++;
      }

      const avgScore = bCount > 0 ? Math.round((bSum / bCount) * 10) / 10 : 0;
      const totalCompletions = bCount;

      // 4a. Orca Practice (based on PracticeSubmissions completed by batch students)
      let bTotalOrcaSolved = 0;
      bStudentIds.forEach(sidStr => {
        bTotalOrcaSolved += orcaMap[sidStr.toString()] || 0;
      });
      const bAvgOrca = bStudentIds.length > 0 ? (bTotalOrcaSolved / bStudentIds.length) : 0;
      const bOrcaScore = bTotalOrcaSolved > 0 ? Math.min(100, Math.round((bAvgOrca / 10) * 100)) : 0;

      // 4b. Gamified Practice
      let bSumGamAccuracy = 0;
      let bGamCompletedCount = 0;
      bGam.forEach(g => {
        bSumGamAccuracy += g.accuracy || 0;
        bGamCompletedCount++;
      });
      const bGamifiedScore = bGamCompletedCount > 0 ? Math.round(bSumGamAccuracy / bGamCompletedCount) : 0;

      // 4c. Aptitude
      let bCorrectMcq = 0;
      let bTotalMcq = bMcq.length;
      bMcq.forEach(m => {
        if (m.isCorrect) bCorrectMcq++;
      });
      const bAptitudeScore = bTotalMcq > 0 ? Math.round((bCorrectMcq / bTotalMcq) * 100) : 0;

      // 4d. Assessments
      let bSumAssPercentage = 0;
      let bAssCount = bAttempts.length;
      bAttempts.forEach(a => {
        bSumAssPercentage += a.overallPercentage || 0;
      });
      const bAssessmentsScore = bAssCount > 0 ? Math.round(bSumAssPercentage / bAssCount) : 0;

      // 4e. Coding Profiles Engagement
      let bTotalConnected = 0;
      let bTotalCodingQuestions = 0;
      bStudentIds.forEach(sid => {
        const s = studentMap[sid.toString()];
        if (s && s.codingProfiles) {
          const cp = s.codingProfiles;
          let hasAny = false;
          let sq = 0;
          if (cp.leetcode && cp.leetcode.connected && cp.leetcode.username) {
            hasAny = true;
            sq += cp.leetcode.totalSolved || 0;
          }
          if (cp.hackerrank && cp.hackerrank.connected && cp.hackerrank.username) {
            hasAny = true;
            sq += cp.hackerrank.totalSolved || 0;
          }
          if (cp.codechef && cp.codechef.connected && cp.codechef.username) {
            hasAny = true;
          }
          if (cp.codeforces && cp.codeforces.connected && cp.codeforces.username) {
            hasAny = true;
            sq += cp.codeforces.totalSolved || 0;
          }
          if (hasAny) {
            bTotalConnected++;
          }
          bTotalCodingQuestions += sq;
        }
      });
      const bCodingConnectionRate = bStudentIds.length > 0 ? (bTotalConnected / bStudentIds.length) * 100 : 0;
      const bCodingProfilesScore = bCodingConnectionRate > 0 ? Math.round(bCodingConnectionRate) : 0;

      // 4f. Projects & Labs
      let bSumLabScore = 0;
      let bLabCount = 0;
      bStudentIds.forEach(sid => {
        const records = studentLabSubmissionsMap[sid.toString()] || [];
        records.forEach(rec => {
          bSumLabScore += rec.score;
          bLabCount++;
        });
      });
      const bLabScore = bLabCount > 0 ? Math.round(bSumLabScore / bLabCount) : 0;

      batchAnalysis.push({
        name: b.name,
        Score: avgScore,
        Students: bStudentIds.length,
        course: b.description || 'Active Cohort',
        completion: bStudentIds.length > 0 ? Math.min(100, Math.round((totalCompletions / (bStudentIds.length * 5 || 1)) * 100)) : 0,
        // Detailed skill index breakdown per batch
        orca: bOrcaScore,
        gamified: bGamifiedScore,
        aptitude: bAptitudeScore,
        assessments: bAssessmentsScore,
        codingProfiles: bCodingProfilesScore,
        projectsLabs: bLabScore
      });
    }

    // 5. BEFORE VS AFTER PORTAL (Baseline Growth)
    const studentAttemptsMap = {};

    const allAssAttempts = await AssessmentAttempt.find({
      tenantId,
      student: { $in: studentIds },
      attemptStatus: { $in: ['COMPLETED', 'AUTO_SUBMITTED'] }
    }).select('student completedAt overallPercentage').lean();

    const allGamAttempts = await GamifiedAttempt.find({
      userId: { $in: studentIds },
      isCompleted: true
    }).select('userId completedAt accuracy').lean();

    const allMcqAttempts = await MCQAttempt.find({
      studentId: { $in: studentIds }
    }).select('studentId timestamp isCorrect').lean();

    allAssAttempts.forEach(att => {
      if (att.student) {
        const sid = att.student.toString();
        if (!studentAttemptsMap[sid]) studentAttemptsMap[sid] = [];
        studentAttemptsMap[sid].push({ type: 'assessment', score: att.overallPercentage || 0, date: att.completedAt });
      }
    });

    allGamAttempts.forEach(att => {
      if (att.userId) {
        const sid = att.userId.toString();
        if (!studentAttemptsMap[sid]) studentAttemptsMap[sid] = [];
        studentAttemptsMap[sid].push({ type: 'gamified', score: att.accuracy || 0, date: att.completedAt });
      }
    });

    allMcqAttempts.forEach(att => {
      if (att.studentId) {
        const sid = att.studentId.toString();
        if (!studentAttemptsMap[sid]) studentAttemptsMap[sid] = [];
        studentAttemptsMap[sid].push({ type: 'mcq', score: att.isCorrect ? 100 : 0, date: att.timestamp });
      }
    });

    const beforeAfterData = [];
    let totalGain = 0;
    let studentGainCount = 0;

    Object.keys(studentMap).forEach(sid => {
      const records = studentAttemptsMap[sid] || [];
      const assRecords = records.filter(r => r.type === 'assessment').sort((a, b) => new Date(a.date) - new Date(b.date));
      const gamRecords = records.filter(r => r.type === 'gamified').sort((a, b) => new Date(a.date) - new Date(b.date));
      const mcqRecords = records.filter(r => r.type === 'mcq').sort((a, b) => new Date(a.date) - new Date(b.date));
      const labRecords = (studentLabSubmissionsMap[sid] || []).sort((a, b) => new Date(a.date) - new Date(b.date));

      // 1. Assessments
      const assBaseline = assRecords.length > 0 ? Math.round(assRecords[0].score) : 0;
      const assCurrent = assRecords.length > 0 ? Math.round(assRecords[assRecords.length - 1].score) : 0;
      const assGain = Math.max(0, assCurrent - assBaseline);

      // 2. Gamified
      const gamBaseline = gamRecords.length > 0 ? Math.round(gamRecords[0].score) : 0;
      const gamCurrent = gamRecords.length > 0 ? Math.round(gamRecords[gamRecords.length - 1].score) : 0;
      const gamGain = Math.max(0, gamCurrent - gamBaseline);

      // 3. Aptitude
      const mcqBaseline = mcqRecords.length > 0 ? Math.round(mcqRecords[0].score) : 0;
      const mcqCurrent = mcqRecords.length > 0 ? Math.round(mcqRecords[mcqRecords.length - 1].score) : 0;
      const mcqGain = Math.max(0, mcqCurrent - mcqBaseline);

      // 4. Orca
      const orcaSolved = orcaMap[sid] || 0;
      const orcaBaseline = 0;
      const orcaCurrent = orcaSolved > 0 ? Math.min(100, Math.round((orcaSolved / 10) * 100)) : 0;
      const orcaGain = Math.max(0, orcaCurrent - orcaBaseline);

      // 5. Coding Profiles
      const sObjStudent = studentMap[sid];
      let connCount = 0;
      if (sObjStudent && sObjStudent.codingProfiles) {
        const cp = sObjStudent.codingProfiles;
        if (cp.leetcode?.connected && cp.leetcode?.username) connCount++;
        if (cp.hackerrank?.connected && cp.hackerrank?.username) connCount++;
        if (cp.codechef?.connected && cp.codechef?.username) connCount++;
        if (cp.codeforces?.connected && cp.codeforces?.username) connCount++;
      }
      const cpBaseline = 0;
      const cpCurrent = connCount > 0 ? Math.round((connCount / 4) * 100) : 0;
      const cpGain = Math.max(0, cpCurrent - cpBaseline);

      // 6. Projects & Labs
      const labBaseline = labRecords.length > 0 ? Math.round(labRecords[0].score) : 0;
      const labCurrent = labRecords.length > 0 ? Math.round(labRecords[labRecords.length - 1].score) : 0;
      const labGain = Math.max(0, labCurrent - labBaseline);

      // Overall averages (only over active domains)
      const activeBaselines = [];
      const activeCurrents = [];

      if (assRecords.length > 0) {
        activeBaselines.push(assBaseline);
        activeCurrents.push(assCurrent);
      }
      if (gamRecords.length > 0) {
        activeBaselines.push(gamBaseline);
        activeCurrents.push(gamCurrent);
      }
      if (mcqRecords.length > 0) {
        activeBaselines.push(mcqBaseline);
        activeCurrents.push(mcqCurrent);
      }
      if (labRecords.length > 0) {
        activeBaselines.push(labBaseline);
        activeCurrents.push(labCurrent);
      }
      if (orcaSolved > 0) {
        activeBaselines.push(orcaBaseline);
        activeCurrents.push(orcaCurrent);
      }
      if (connCount > 0) {
        activeBaselines.push(cpBaseline);
        activeCurrents.push(cpCurrent);
      }

      const overallBaseline = activeBaselines.length > 0
        ? Math.round(activeBaselines.reduce((sum, b) => sum + b, 0) / activeBaselines.length)
        : 0;
      const overallCurrent = activeCurrents.length > 0
        ? Math.round(activeCurrents.reduce((sum, c) => sum + c, 0) / activeCurrents.length)
        : 0;
      const overallGain = Math.max(0, overallCurrent - overallBaseline);

      if (sObjStudent) {
        const mergedBatches = Array.from(new Set([
          ...(studentBatchMap[sid] || []),
          ...(sObjStudent.profile?.batch || [])
        ]));
        const institutionDomain = sObjStudent.email && sObjStudent.email.includes('@')
          ? sObjStudent.email.split('@')[1].toLowerCase()
          : '';

        beforeAfterData.push({
          student: sObjStudent.name || 'Student',
          studentId: sid,
          email: sObjStudent.email,
          batches: mergedBatches,
          primaryBatch: mergedBatches[0] || '',
          institution: institutionDomain,
          
          overall: { baseline: overallBaseline, current: overallCurrent, gain: overallGain },
          orca: { baseline: orcaBaseline, current: orcaCurrent, gain: orcaGain },
          gamified: { baseline: gamBaseline, current: gamCurrent, gain: gamGain },
          aptitude: { baseline: mcqBaseline, current: mcqCurrent, gain: mcqGain },
          assessments: { baseline: assBaseline, current: assCurrent, gain: assGain },
          codingProfiles: { baseline: cpBaseline, current: cpCurrent, gain: cpGain },
          projectsLabs: { baseline: labBaseline, current: labCurrent, gain: labGain }
        });
        totalGain += overallGain;
        studentGainCount++;
      }
    });

    const avgImprovement = studentGainCount > 0 ? `+${(totalGain / studentGainCount).toFixed(1)}%` : '+0%';

    // 6. SOCIAL PROFILE CERTIFICATE SHARES (Competitive Programming Platforms)
    const totalCertificates = await Certificate.countDocuments({ tenantId, student: { $in: studentIds } });
    const socialSharing = [
      { platform: 'LeetCode', shares: leetcodeConnectedCount, views: '0', clicks: 0, contacts: 0, color: '#FFA116' },
      { platform: 'HackerRank', shares: hackerrankConnectedCount, views: '0', clicks: 0, contacts: 0, color: '#2EC866' },
      { platform: 'CodeChef', shares: codechefConnectedCount, views: '0', clicks: 0, contacts: 0, color: '#5B4636' },
      { platform: 'Codeforces', shares: codeforcesConnectedCount, views: '0', clicks: 0, contacts: 0, color: '#1F8EEA' }
    ];

    // 7. TOPPERS LEADERBOARDS
    const studentAverages = [];
    Object.keys(studentAttemptsMap).forEach(sid => {
      const records = studentAttemptsMap[sid];
      const sum = records.reduce((acc, r) => acc + r.score, 0);
      const avg = records.length > 0 ? sum / records.length : 0;
      const sObj = studentMap[sid];
      if (sObj) {
        const mergedBatches = Array.from(new Set([
          ...(studentBatchMap[sid] || []),
          ...(sObj.profile?.batch || [])
        ]));
        const institutionDomain = sObj.email && sObj.email.includes('@')
          ? sObj.email.split('@')[1].toLowerCase()
          : '';

        studentAverages.push({
          studentId: sid,
          name: sObj.name,
          email: sObj.email,
          score: Math.round(avg * 10) / 10,
          submissions: records.length,
          roll: sObj.profile?.rollNumber || sid.substring(sid.length - 8).toUpperCase(),
          batches: mergedBatches,
          primaryBatch: mergedBatches[0] || '',
          institution: institutionDomain
        });
      }
    });

    studentAverages.sort((a, b) => b.score - a.score);

    const badgeForRank = (idx) =>
      idx === 0 ? 'Code Master' : idx === 1 ? 'Tech Lead' : idx === 2 ? 'Algorist' : 'Consistent';

    // Query actual certificates per student
    const allCertificates = await Certificate.find({
      student: { $in: studentIds }
    }).select('student').lean();

    const studentCertificateCountMap = {};
    allCertificates.forEach(c => {
      if (c.student) {
        const sid = c.student.toString();
        studentCertificateCountMap[sid] = (studentCertificateCountMap[sid] || 0) + 1;
      }
    });

    const toppersLeaderboard = studentAverages.map((t, idx) => ({
      rank: idx + 1,
      studentId: t.studentId,
      name: t.name,
      email: t.email,
      roll: t.roll.startsWith('OH-') ? t.roll : `OH-${t.roll}`,
      score: t.score,
      submissions: t.submissions,
      primaryBatch: t.primaryBatch,
      batches: t.batches,
      institution: t.institution,
      certificates: studentCertificateCountMap[t.studentId] || 0,
      badge: badgeForRank(idx)
    }));

    const toppersList = toppersLeaderboard.slice(0, 4);
    const institutionToppers = toppersLeaderboard.slice(0, 5);

    // 8. SKILLS RADAR (Real calculation for: Orca, Gamified, Aptitude, Assessments, Coding Profiles, Projects & Labs)
    // 8a. Orca Strength (based on PracticeSubmissions completed)
    let totalOrcaSolved = 0;
    (orcaSolvedAgg || []).forEach(r => {
      totalOrcaSolved += r.totalSolved || 0;
    });
    const avgOrca = studentIds.length > 0 ? (totalOrcaSolved / studentIds.length) : 0;
    const orcaScore = totalOrcaSolved > 0 ? Math.min(100, Math.round((avgOrca / 10) * 100)) : 0;

    // 8b. Gamified Strength (based on GamifiedAttempts accuracy)
    let sumGamAccuracy = 0;
    let gamCompletedCount = 0;
    (allGamAttempts || []).forEach(g => {
      sumGamAccuracy += g.accuracy || 0;
      gamCompletedCount++;
    });
    const gamifiedScore = gamCompletedCount > 0 ? Math.round(sumGamAccuracy / gamCompletedCount) : 0;

    // 8c. Aptitude Strength (based on MCQAttempts accuracy)
    let correctMcq = 0;
    let totalMcq = (allMcqAttempts || []).length;
    (allMcqAttempts || []).forEach(m => {
      if (m.isCorrect) correctMcq++;
    });
    const aptitudeScore = totalMcq > 0 ? Math.round((correctMcq / totalMcq) * 100) : 0;

    // 8d. Assessments Strength (based on AssessmentAttempts score)
    let sumAssPercentage = 0;
    const assCount = (allAssAttempts || []).length;
    (allAssAttempts || []).forEach(a => {
      sumAssPercentage += a.overallPercentage || 0;
    });
    const assessmentsScore = assCount > 0 ? Math.round(sumAssPercentage / assCount) : 0;

    // 8e. Coding Profiles Connection/Engagement Strength
    const codingConnectionRate = studentIds.length > 0 ? (totalConnectedStudents / studentIds.length) * 100 : 0;
    const codingProfilesScore = codingConnectionRate > 0 ? Math.round(codingConnectionRate) : 0;

    // 8f. Projects & Labs (based on LabSubmissions average score)
    const labSubmissions = await LabSubmission.find({
      studentId: { $in: studentIds },
      status: { $in: ['submitted', 'passed'] }
    }).select('score').lean();

    let sumLabScore = 0;
    let labCount = labSubmissions.length;
    labSubmissions.forEach(ls => {
      sumLabScore += ls.score || 0;
    });
    const labScore = labCount > 0 ? Math.round(sumLabScore / labCount) : 0;

    const skillsRadar = [
      { subject: 'Orca', A: orcaScore, fullMark: 100 },
      { subject: 'Gamified', A: gamifiedScore, fullMark: 100 },
      { subject: 'Aptitude', A: aptitudeScore, fullMark: 100 },
      { subject: 'Assessments', A: assessmentsScore, fullMark: 100 },
      { subject: 'Coding Profiles', A: codingProfilesScore, fullMark: 100 },
      { subject: 'Projects & Labs', A: labScore, fullMark: 100 }
    ];

    // Fetch last sync date for tenant
    const Tenant = require('../models/Tenant');
    const tenant = await Tenant.findById(tenantId).select('lastCodingProfilesSync').lean();
    const lastCodingProfilesSync = tenant ? tenant.lastCodingProfilesSync : null;

    res.json({
      kpis,
      rangeKpis,
      hourlyDistribution,
      calendarData,
      batchAnalysis,
      beforeAfterData,
      avgImprovement,
      socialSharing,
      toppersList,
      toppersLeaderboard,
      institutionToppers,
      skillsRadar,
      codingProfilesStats,
      studentCodingProfilesList,
      platformDistribution,
      codingFilterOptions,
      lastCodingProfilesSync
    });

  } catch (error) {
    console.error('Error in instructor-analytics:', error);
    res.status(500).json({ message: 'Error fetching analytics data', error: error.message });
  }
};

const os = require('os');

exports.getSystemStats = async (req, res) => {
  try {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const cpuLoad = os.loadavg()[0]; // 1-minute load average
    const cpus = os.cpus().length;
    const cpuPercentage = Math.min(Math.round((cpuLoad / cpus) * 100), 100) || Math.floor(Math.random() * 15) + 5;

    // Simulated Utho storage stats
    const totalStorage = 500 * 1024 * 1024 * 1024; // 500 GB in bytes
    const usedStorage = 142.5 * 1024 * 1024 * 1024; // 142.5 GB in bytes

    // Live MongoDB Hits per second (simulate a random variation on top of a baseline)
    const baseHits = 35;
    const randomVariation = Math.floor(Math.random() * 20) - 10; // -10 to +10
    const currentHits = Math.max(1, baseHits + randomVariation);

    res.json({
      cpu: cpuPercentage,
      memory: {
        total: totalMem,
        used: usedMem,
        free: freeMem,
        percentage: Math.round((usedMem / totalMem) * 100)
      },
      storage: {
        total: totalStorage,
        used: usedStorage,
        percentage: Math.round((usedStorage / totalStorage) * 100)
      },
      mongoDbHits: currentHits,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('System stats error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Helper function to sync a single student's coding profiles
async function syncSingleStudent(student) {
  let updated = false;
  const cp = student.codingProfiles;
  if (!cp) return;

  // 1. LeetCode
  if (cp.leetcode && cp.leetcode.connected && cp.leetcode.username) {
    try {
      const leetcodeResponse = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query {
              matchedUser(username: "${cp.leetcode.username}") {
                username
                profile {
                  ranking
                  reputation
                }
                submitStats {
                  acSubmissionNum {
                    difficulty
                    count
                  }
                }
              }
            }
          `
        })
      });
      const leetcodeData = await leetcodeResponse.json();
      const userData = leetcodeData?.data?.matchedUser;
      
      if (userData) {
        const submissions = userData.submitStats?.acSubmissionNum || [];
        const totalSolved = submissions.find(s => s.difficulty === 'All')?.count || 0;
        const easySolved = submissions.find(s => s.difficulty === 'Easy')?.count || 0;
        const mediumSolved = submissions.find(s => s.difficulty === 'Medium')?.count || 0;
        const hardSolved = submissions.find(s => s.difficulty === 'Hard')?.count || 0;
        
        student.codingProfiles.leetcode.totalSolved = totalSolved;
        student.codingProfiles.leetcode.easySolved = easySolved;
        student.codingProfiles.leetcode.mediumSolved = mediumSolved;
        student.codingProfiles.leetcode.hardSolved = hardSolved;
        student.codingProfiles.leetcode.ranking = userData.profile?.ranking || 0;
        student.codingProfiles.leetcode.reputation = userData.profile?.reputation || 0;
        student.codingProfiles.leetcode.lastSynced = new Date();
        updated = true;
      }
    } catch (error) {
      console.error(`LeetCode sync error for ${cp.leetcode.username}:`, error);
    }
  }

  // 2. Codeforces
  if (cp.codeforces && cp.codeforces.connected && cp.codeforces.username) {
    try {
      const [userResponse, statusResponse] = await Promise.all([
        fetch(`https://codeforces.com/api/user.info?handles=${cp.codeforces.username}`),
        fetch(`https://codeforces.com/api/user.status?handle=${cp.codeforces.username}`)
      ]);
      
      const userData = await userResponse.json();
      const statusData = await statusResponse.json();
      
      if (userData.status === 'OK' && statusData.status === 'OK') {
        const user = userData.result[0];
        const solvedProblems = new Set();
        
        statusData.result.forEach(submission => {
          if (submission.verdict === 'OK') {
            solvedProblems.add(`${submission.problem.contestId}-${submission.problem.index}`);
          }
        });
        
        student.codingProfiles.codeforces.totalSolved = solvedProblems.size;
        student.codingProfiles.codeforces.rating = user.rating || 0;
        student.codingProfiles.codeforces.rank = user.rank || 'unrated';
        student.codingProfiles.codeforces.maxRating = user.maxRating || 0;
        student.codingProfiles.codeforces.lastSynced = new Date();
        updated = true;
      }
    } catch (error) {
      console.error(`Codeforces sync error for ${cp.codeforces.username}:`, error);
    }
  }

  // 3. HackerRank
  if (cp.hackerrank && cp.hackerrank.connected && cp.hackerrank.username) {
    try {
      const hrResponse = await fetch(`https://www.hackerrank.com/rest/hackers/${cp.hackerrank.username}/badges`);
      const hrData = await hrResponse.json();
      
      if (hrData.status && hrData.models) {
        let totalSolved = 0;
        let badges = 0;
        
        hrData.models.forEach(model => {
          if (model.solved) totalSolved += model.solved;
          if (model.stars) badges += model.stars;
        });
        
        student.codingProfiles.hackerrank.totalSolved = totalSolved;
        student.codingProfiles.hackerrank.badges = badges;
        student.codingProfiles.hackerrank.lastSynced = new Date();
        updated = true;
      }
    } catch (error) {
      console.error(`HackerRank sync error for ${cp.hackerrank.username}:`, error);
    }
  }

  // 4. CodeChef
  if (cp.codechef && cp.codechef.connected && cp.codechef.username) {
    try {
      const ccResponse = await fetch(`https://codechef-api.vercel.app/${cp.codechef.username}`);
      const ccData = await ccResponse.json();
      
      if (ccData.success) {
        student.codingProfiles.codechef.rating = ccData.currentRating || 0;
        student.codingProfiles.codechef.globalRank = ccData.globalRank || 0;
        student.codingProfiles.codechef.stars = ccData.stars || '0★';
        student.codingProfiles.codechef.lastSynced = new Date();
        updated = true;
      }
    } catch (error) {
      console.error(`CodeChef sync error for ${cp.codechef.username}:`, error);
    }
  }

  if (updated) {
    student.markModified('codingProfiles');
    await student.save();
  }
}

// Controller to sync coding profiles for all connected students under a tenant
exports.syncCodingProfiles = async (req, res) => {
  try {
    const Tenant = require('../models/Tenant');
    const Student = require('../models/Student');

    const tenantId = req.headers['x-tenant-id'];
    if (!tenantId) {
      return res.status(400).json({ message: 'Tenant ID is required' });
    }

    const tenant = await Tenant.findById(tenantId);
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }

    // Cooldown check: 24 hours (86400000 ms)
    const now = new Date();
    if (tenant.lastCodingProfilesSync) {
      const cooldownMs = 24 * 60 * 60 * 1000;
      const lastSyncTime = new Date(tenant.lastCodingProfilesSync).getTime();
      const elapsed = now.getTime() - lastSyncTime;
      if (elapsed < cooldownMs) {
        const remainingMs = cooldownMs - elapsed;
        const remainingHours = Math.floor(remainingMs / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
        return res.status(400).json({
          message: `Sync is on a 24-hour cooldown. Please try again in ${remainingHours} hours and ${remainingMinutes} minutes.`
        });
      }
    }

    // Find students under the tenant with at least one connected profile
    const students = await Student.find(await buildStudentScope(req.user, tenantId));
    const studentsToSync = students.filter(student => {
      const cp = student.codingProfiles;
      if (!cp) return false;
      return (
        (cp.leetcode && cp.leetcode.connected && cp.leetcode.username) ||
        (cp.codeforces && cp.codeforces.connected && cp.codeforces.username) ||
        (cp.hackerrank && cp.hackerrank.connected && cp.hackerrank.username) ||
        (cp.codechef && cp.codechef.connected && cp.codechef.username)
      );
    });

    if (studentsToSync.length === 0) {
      tenant.lastCodingProfilesSync = now;
      await tenant.save();
      return res.json({
        message: 'No student accounts with connected coding profiles found to sync.',
        lastCodingProfilesSync: now
      });
    }

    // Update last sync time BEFORE executing to block concurrent clicks
    tenant.lastCodingProfilesSync = now;
    await tenant.save();

    // Sync all profiles concurrently
    await Promise.all(studentsToSync.map(s => syncSingleStudent(s)));

    res.json({
      message: `Successfully synced coding profiles for ${studentsToSync.length} students.`,
      lastCodingProfilesSync: now
    });

  } catch (error) {
    console.error('Error syncing coding profiles:', error);
    res.status(500).json({ message: 'Error syncing coding profiles', error: error.message });
  }
};

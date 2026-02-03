const express = require('express');
const router = express.Router();
const {
  getPracticeLeaderboard,
  getQuizLeaderboard,
  getAssessmentLeaderboard,
  getOverallLeaderboard
} = require('../controllers/leaderboardController');
const { auth } = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// GET /api/leaderboard/practice - Get practice leaderboard
router.get('/practice', getPracticeLeaderboard);

// GET /api/leaderboard/quizzes - Get quiz leaderboard
router.get('/quizzes', getQuizLeaderboard);

// GET /api/leaderboard/assessments - Get assessment leaderboard
router.get('/assessments', getAssessmentLeaderboard);

// GET /api/leaderboard/overall - Get overall leaderboard
router.get('/overall', getOverallLeaderboard);

module.exports = router;
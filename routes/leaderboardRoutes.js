const express = require('express');
const router = express.Router();
const {
  getAssessmentLeaderboard,
  getOverallLeaderboard,
  getContestLeaderboard
} = require('../controllers/leaderboardController');

// GET /api/leaderboard/assessments - Get assessment leaderboard
router.get('/assessments', getAssessmentLeaderboard);

// GET /api/leaderboard/overall - Get overall leaderboard
router.get('/overall', getOverallLeaderboard);

// GET /api/leaderboard/contest/:assessmentId - Get contest leaderboard
router.get('/contest/:assessmentId', getContestLeaderboard);

module.exports = router;
const express = require('express');
const router = express.Router();
const {
  getAssessmentLeaderboard,
  getOverallLeaderboard
} = require('../controllers/leaderboardController');

// GET /api/leaderboard/assessments - Get assessment leaderboard
router.get('/assessments', getAssessmentLeaderboard);

// GET /api/leaderboard/overall - Get overall leaderboard
router.get('/overall', getOverallLeaderboard);

module.exports = router;
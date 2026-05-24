const express = require('express');
const router = express.Router();
const { getDashboardData, getAdminStats, getInstructorStats, getSystemStats } = require('../controllers/dashboardController');
const { auth, authorize } = require('../middleware/auth');

router.get('/data', getDashboardData);
router.get('/admin-stats', auth, authorize('admin'), getAdminStats);
router.get('/instructor-stats', auth, authorize('instructor', 'admin'), getInstructorStats);
router.get('/system-stats', auth, authorize('admin'), getSystemStats);

module.exports = router;

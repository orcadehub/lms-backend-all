const express = require('express');
const router = express.Router();
const siteConfigController = require('../controllers/siteConfigController');
const { auth, authorize } = require('../middleware/auth');

// Public: Get current site configuration
router.get('/', siteConfigController.getConfig);

// Admin only: Update site configuration
router.put('/', auth, authorize('admin'), siteConfigController.updateConfig);

module.exports = router;

const express = require('express');
const tenantController = require('../controllers/tenantController');
const { auth, authorize } = require('../middleware/auth');
const { validateApiKey } = require('../middleware/apiKeyAuth');
const multer = require('multer');

const router = express.Router();

// Configure multer for logo uploads
const upload = multer({ dest: 'uploads/logos/' });

// Public endpoint - Get tenant config (requires API key)
router.get('/config', validateApiKey, tenantController.getTenantConfig);

// Admin endpoints
router.get('/', auth, authorize('admin'), tenantController.getAllTenants);
router.post('/', auth, authorize('admin'), upload.single('logo'), tenantController.createTenant);
router.put('/:id', auth, authorize('admin'), tenantController.updateTenant);
router.delete('/:id', auth, authorize('admin'), tenantController.deleteTenant);
router.post('/:id/regenerate-key', auth, authorize('admin'), tenantController.regenerateApiKey);

// Instructor endpoints
router.get('/my-tenants', auth, authorize('instructor'), tenantController.getInstructorTenants);
router.get('/students', auth, authorize('instructor'), tenantController.getAllStudents);
router.post('/quiz/create', auth, authorize('instructor'), tenantController.createQuizForTenants);

module.exports = router;
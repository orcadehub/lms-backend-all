const express = require('express');
const router = express.Router();
const {
  createAssessment,
  getAssessments,
  getAssessmentById,
  updateAssessment,
  deleteAssessment,
  goLiveAssessment,
  updateAssessmentTime,
  getAssessmentAttempts,
  handleStudentAction,
  exportAssessmentResults
} = require('../controllers/assessmentController');
const { auth } = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// POST /api/assessments - Create assessment
router.post('/', createAssessment);

// GET /api/assessments - Get all assessments
router.get('/', getAssessments);

// GET /api/assessments/:id - Get assessment by ID
router.get('/:id', getAssessmentById);

// PUT /api/assessments/:id - Update assessment
router.put('/:id', updateAssessment);

// PATCH /api/assessments/:id - Update assessment questions
router.patch('/:id', updateAssessment);

// DELETE /api/assessments/:id - Delete assessment
router.delete('/:id', deleteAssessment);

// POST /api/assessments/:id/go-live - Make assessment live
router.post('/:id/go-live', goLiveAssessment);

// PATCH /api/assessments/:id/update-time - Update assessment settings
router.patch('/:id/update-time', updateAssessmentTime);

// GET /api/assessments/:id/attempts - Get assessment attempts
router.get('/:id/attempts', getAssessmentAttempts);

// GET /api/assessments/:id/results - Export assessment results to Excel
router.get('/:id/results', exportAssessmentResults);

// PATCH /api/assessment-attempts/:attemptId/:action - Handle student actions
router.patch('/attempts/:attemptId/:action', handleStudentAction);

module.exports = router;
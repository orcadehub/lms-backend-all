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

// PATCH /api/assessments/:id/expire-timer - Handle timer expiration
router.patch('/:id/expire-timer', require('../controllers/assessmentController').expireAssessmentTimer);

// PATCH /api/assessments/:id/mark-all-inprogress-completed - Mark all in-progress as completed
router.patch('/:id/mark-all-inprogress-completed', require('../controllers/assessmentController').markAllInProgressCompleted);

// PATCH /api/assessments/:id/mark-all-inprogress-resume - Mark all in-progress as resume allowed
router.patch('/:id/mark-all-inprogress-resume', require('../controllers/assessmentController').markAllInProgressResume);

// PATCH /api/assessments/:id/mark-all-completed-resume - Mark all completed as resume allowed
router.patch('/:id/mark-all-completed-resume', require('../controllers/assessmentController').markAllCompletedResume);

// PATCH /api/assessments/:id/mark-all-inprogress-retake - Mark all in-progress as retake allowed
router.patch('/:id/mark-all-inprogress-retake', require('../controllers/assessmentController').markAllInProgressRetake);

// POST /api/assessments/:id/quiz-questions - Add quiz question to assessment
router.post('/:id/quiz-questions', require('../controllers/assessmentController').addQuizQuestion);

// DELETE /api/assessments/:id/quiz-questions/:questionId - Remove quiz question from assessment
router.delete('/:id/quiz-questions/:questionId', require('../controllers/assessmentController').removeQuizQuestion);

// POST /api/assessments/:id/frontend-questions - Add frontend question to assessment
router.post('/:id/frontend-questions', require('../controllers/assessmentController').addFrontendQuestion);

// DELETE /api/assessments/:id/frontend-questions/:questionId - Remove frontend question from assessment
router.delete('/:id/frontend-questions/:questionId', require('../controllers/assessmentController').removeFrontendQuestion);

// PATCH /api/assessment-attempts/:attemptId/:action - Handle student actions
router.patch('/attempts/:attemptId/:action', handleStudentAction);

module.exports = router;
const express = require('express');
const router = express.Router();
const labController = require('../controllers/labController');
const { auth } = require('../middleware/auth');

// Public routes (no auth required)
router.get('/', labController.getAllLabs);
router.get('/:id', labController.getLabById);

// Protected routes (auth required)
router.post('/save-progress', auth, labController.saveProgress);
router.post('/submit', auth, labController.submitLab);
router.post('/execute-command', auth, labController.executeCommand);
router.get('/:id/submission', auth, labController.getSubmission);
router.post('/', auth, labController.createLab);
router.put('/:id', auth, labController.updateLab);
router.delete('/:id', auth, labController.deleteLab);

module.exports = router;

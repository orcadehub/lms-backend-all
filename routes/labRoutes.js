const express = require('express');
const router = express.Router();
const labController = require('../controllers/labController');
const { auth } = require('../middleware/auth');

router.get('/', auth, labController.getAllLabs);
router.post('/save-progress', auth, labController.saveProgress);
router.post('/submit', auth, labController.submitLab);
router.post('/execute-command', auth, labController.executeCommand);
router.get('/:id/submission', auth, labController.getSubmission);
router.get('/:id', auth, labController.getLabById);
router.post('/', auth, labController.createLab);
router.put('/:id', auth, labController.updateLab);
router.delete('/:id', auth, labController.deleteLab);

module.exports = router;

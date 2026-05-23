const express = require('express');
const lmsRequestController = require('../controllers/lmsRequestController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', lmsRequestController.createRequest);

router.get('/', auth, authorize('admin'), lmsRequestController.getAllRequests);
router.patch('/:id/status', auth, authorize('admin'), lmsRequestController.updateRequestStatus);

module.exports = router;

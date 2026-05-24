const express = require('express');
const router = express.Router();
const certificateDesignController = require('../controllers/certificateDesignController');
const { auth } = require('../middleware/auth');
const { checkPermission } = require('../middleware/permissions');

// Route configurations for managing certificate templates
router.post('/', auth, checkPermission('manage_certificates'), certificateDesignController.createDesign);
router.get('/', auth, checkPermission('manage_certificates'), certificateDesignController.getDesigns);
router.get('/:id', auth, checkPermission('manage_certificates'), certificateDesignController.getDesignById);
router.put('/:id', auth, checkPermission('manage_certificates'), certificateDesignController.updateDesign);
router.delete('/:id', auth, checkPermission('manage_certificates'), certificateDesignController.deleteDesign);

module.exports = router;

const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');
const { auth } = require('../middleware/auth');
const { checkPermission } = require('../middleware/permissions');

// Create multiple certificates - Requires instructor auth & manage_certificates permission
router.post('/', auth, checkPermission('manage_certificates'), certificateController.createCertificates);

// Fetch logged in student's certificates
// Using the same 'auth' middleware depending on how it's structurally shared for students vs instructors
// But we assume the middleware attaches req.user
router.get('/my-certificates', auth, certificateController.getMyCertificates);

// View public verifiable certificate directly by String ID (e.g., OH-DDMMYYYY-XXXXX)
// We make this route public (no auth) so anyone can verify the certificate
router.get('/view/:certificateId', certificateController.getCertificateByStringId);

module.exports = router;

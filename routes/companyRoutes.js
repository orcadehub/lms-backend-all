const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const { auth } = require('../middleware/auth');

// Company Routes
router.post('/companies', auth, companyController.createCompany);
router.get('/companies', auth, companyController.getAllCompanies);
router.get('/companies/tenant', auth, companyController.getCompaniesByTenant);
router.put('/companies/:id', auth, companyController.updateCompany);
router.delete('/companies/:id', auth, companyController.deleteCompany);

// Company Specific Question Routes
router.post('/questions', auth, companyController.createQuestion);
router.get('/questions/company/:companyId', auth, companyController.getQuestionsByCompany);
router.get('/questions/:id', auth, companyController.getQuestionById);
router.put('/questions/:id', auth, companyController.updateQuestion);
router.delete('/questions/:id', auth, companyController.deleteQuestion);

module.exports = router;

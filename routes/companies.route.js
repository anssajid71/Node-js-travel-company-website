const express = require('express');
const router = express.Router();
const CompaniesController = require('../controllers/CompaniesController');

router.get('/', CompaniesController.getAllCompanies);
router.get('/:id', CompaniesController.getCompanyById);
router.post('/', CompaniesController.createCompany);
router.put('/:id', CompaniesController.updateCompany);
router.delete('/:id', CompaniesController.deleteCompany);

module.exports = router;

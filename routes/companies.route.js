const express = require('express');
const router = express.Router();
const CompaniesController = require('../controllers/companies.controller');

router.get('/', CompaniesController.getAllCompanies);
router.get('/:id', CompaniesController.getCompanyById);
router.post('/', CompaniesController.createCompany);
router.put('/:id', CompaniesController.updateCompany);
router.delete('/:id', CompaniesController.deleteCompany);

module.exports = router;

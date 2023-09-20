const express = require('express');
const router = express.Router();
const CompaniesController = require('../controllers/companies.controller');
const CompaniesMiddleware = require('../middlewares/companies.middleware');

router.post(
  '/',
  CompaniesMiddleware.validateCompanyData,
  CompaniesController.createCompany
);
router.put(
  '/:id',
  CompaniesMiddleware.validateCompanyData,
  CompaniesController.updateCompany
);

router.get('/', CompaniesController.getAllCompanies);
router.get('/:id', CompaniesController.getCompanyById);
router.post('/', CompaniesController.createCompany);
router.put('/:id', CompaniesController.updateCompany);
router.delete('/:id', CompaniesController.deleteCompany);

module.exports = router;

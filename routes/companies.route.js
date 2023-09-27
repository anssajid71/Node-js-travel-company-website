const express = require('express');
const router = express.Router();
const CompaniesController = require('../controllers/companies.controller');
const {
  validateCompanyCreation,
  validateCompanyUpdate,
  handleValidationErrors,
} = require('../validations/companies.validation');

// Create a new company
router.post(
  '/',
  validateCompanyCreation,
  handleValidationErrors,
  CompaniesController.createCompany
);

// Update a company by ID
router.put(
  '/:id',
  validateCompanyUpdate,
  handleValidationErrors,
  CompaniesController.updateCompany
);

// Get all companies
router.get('/', CompaniesController.getAllCompanies);

// Get a company by ID
router.get('/:id', CompaniesController.getCompanyById);

// Delete a company by ID
router.delete('/:id', CompaniesController.deleteCompany);

module.exports = router;

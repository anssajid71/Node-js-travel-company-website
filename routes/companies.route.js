const express = require('express');
const router = express.Router();
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware');

const {
  createCompany,
  updateCompany,
  getAllCompanies,
  getCompanyById,
  deleteCompany,
} = require('../controllers/companies.controller');
const {
  validateCompanyCreation,
  validateCompanyUpdate,
  handleValidationErrors,
} = require('../validations/companies.validation');

router.post(
  '/',
  validateCompanyCreation,
  handleValidationErrors,
  jwtAuthMiddleware,
  createCompany
);

router.put(
  '/:id',
  validateCompanyUpdate,
  handleValidationErrors,
  jwtAuthMiddleware,
  updateCompany
);

router.get('/', jwtAuthMiddleware, getAllCompanies);

router.get('/:id', jwtAuthMiddleware, getCompanyById);

router.delete('/:id', jwtAuthMiddleware, deleteCompany);

module.exports = router;

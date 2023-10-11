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
  validateSignUpRequest,
  isRequestValidated,
} = require('../validations/companies.validation');

router.post(
  '/signup',
  validateSignUpRequest,
  isRequestValidated,
  createCompany
);

router.put(
  '/:id',

  updateCompany
);

router.get('/', jwtAuthMiddleware, getAllCompanies);

router.get('/:id', jwtAuthMiddleware, getCompanyById);

router.delete('/:id', jwtAuthMiddleware, deleteCompany);

module.exports = router;

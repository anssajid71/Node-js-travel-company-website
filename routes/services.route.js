const express = require('express');
const router = express.Router();
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware');

const {
  createService,
  updateService,
  deleteService,
  getServiceById,
  getAllServices,
} = require('../controllers/services.controller');
const {
  createServiceValidation,
  validateServiceUpdate,
  handleValidationErrors,
} = require('../validations/services.validation');

router.post(
  '/signup',
  createServiceValidation,
  handleValidationErrors,
  // jwtAuthMiddleware,
  createService
);

router.get('/getall', jwtAuthMiddleware, getAllServices);

router.put('/:id', jwtAuthMiddleware, updateService);

router.get('/:id', jwtAuthMiddleware, getServiceById);

router.delete('/:id', jwtAuthMiddleware, deleteService);

module.exports = router;

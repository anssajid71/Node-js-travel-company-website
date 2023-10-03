const express = require('express');
const router = express.Router();
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware');

const {
  createService,
  updateService,
  getAllServices,
  getServiceById,
  deleteService,
} = require('../controllers/services.controller');
const {
  createServiceValidation,
  updateServiceValidation,
  handleValidationErrors,
} = require('../validations/services.validation');

router.post(
  '/',
  createServiceValidation,
  handleValidationErrors,
  jwtAuthMiddleware,
  createService
);
router.put(
  '/:id',
  updateServiceValidation,
  handleValidationErrors,
  jwtAuthMiddleware,
  updateService
);

router.get('/', jwtAuthMiddleware, getAllServices);
router.get('/:id', jwtAuthMiddleware, getServiceById);

router.delete('/:id', jwtAuthMiddleware, deleteService);

module.exports = router;

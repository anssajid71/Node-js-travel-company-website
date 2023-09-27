const express = require('express');
const router = express.Router();
const ServicesController = require('../controllers/services.controller');
const {
  createServiceValidation,
  updateServiceValidation,
  handleValidationErrors,
} = require('../validations/services.validation');

router.post(
  '/',
  createServiceValidation,
  handleValidationErrors,
  ServicesController.createService
);
router.put(
  '/:id',
  updateServiceValidation,
  handleValidationErrors,
  ServicesController.updateService
);

router.get('/', ServicesController.getAllServices);
router.get('/:id', ServicesController.getServiceById);

router.delete('/:id', ServicesController.deleteService);

module.exports = router;

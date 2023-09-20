const express = require('express');
const router = express.Router();
const ServicesController = require('../controllers/services.controller');
const ServicesMiddleware = require('../middlewares/services.middleware');

router.post(
  '/',
  ServicesMiddleware.validateServiceData,
  ServicesController.createService
);
router.put(
  '/:id',
  ServicesMiddleware.validateServiceData,
  ServicesController.updateService
);

router.get('/', ServicesController.getAllServices);
router.get('/:id', ServicesController.getServiceById);
router.post('/', ServicesController.createService);
router.put('/:id', ServicesController.updateService);
router.delete('/:id', ServicesController.deleteService);

module.exports = router;

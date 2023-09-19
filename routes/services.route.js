const express = require('express');
const router = express.Router();
const ServicesController = require('../controllers/ServicesController');

router.get('/', ServicesController.getAllServices);
router.get('/:id', ServicesController.getServiceById);
router.post('/', ServicesController.createService);
router.put('/:id', ServicesController.updateService);
router.delete('/:id', ServicesController.deleteService);

module.exports = router;

const express = require('express');
const router = express.Router();
const PackagesController = require('../controllers/packages.controller');
const {
  validatePackageCreation,
  validatePackageUpdate,
  handleValidationErrors,
} = require('../validations/packages.validation'); // Import package validations

router.post(
  '/',
  validatePackageCreation,
  handleValidationErrors,
  PackagesController.createPackage
);
router.put(
  '/:id',
  validatePackageUpdate,
  handleValidationErrors,
  PackagesController.updatePackage
);

router.get('/', PackagesController.getAllPackages);
router.get('/:id', PackagesController.getPackageById);

router.delete('/:id', PackagesController.deletePackage);

module.exports = router;

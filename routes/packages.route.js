const express = require('express');
const router = express.Router();
const PackagesController = require('../controllers/PackagesController');

router.get('/', PackagesController.getAllPackages);
router.get('/:id', PackagesController.getPackageById);
router.post('/', PackagesController.createPackage);
router.put('/:id', PackagesController.updatePackage);
router.delete('/:id', PackagesController.deletePackage);

module.exports = router;

const express = require('express');
const router = express.Router();
const HotelsController = require('../controllers/hotels.controller');
const {
  validateHotelCreation,
  validateHotelUpdate,
  handleValidationErrors,
} = require('../validations/hotels.validation');

// Create a new hotel
router.post(
  '/',
  validateHotelCreation,
  handleValidationErrors,
  HotelsController.createHotel
);

// Update a hotel by ID
router.put(
  '/:id',
  validateHotelUpdate,
  handleValidationErrors,
  HotelsController.updateHotel
);

// Get all hotels
router.get('/', HotelsController.getAllHotels);

// Get a hotel by ID
router.get('/:id', HotelsController.getHotelById);

// Delete a hotel by ID
router.delete('/:id', HotelsController.deleteHotel);

module.exports = router;

const express = require('express');
const router = express.Router();
const BookingsController = require('../controllers/booking.controller');
const {
  validateBookingCreation,
  validateBookingUpdate,
  handleValidationErrors,
} = require('../validations/booking.validation');

// Create a new booking
router.post(
  '/',
  validateBookingCreation,
  handleValidationErrors,
  BookingsController.createBooking
);

// Update a booking by ID
router.put(
  '/:id',
  validateBookingUpdate,
  handleValidationErrors,
  BookingsController.updateBooking
);

// Get all bookings
router.get('/', BookingsController.getAllBookings);

// Get a booking by ID
router.get('/:id', BookingsController.getBookingById);

// Delete a booking by ID
router.delete('/:id', BookingsController.deleteBooking);

module.exports = router;

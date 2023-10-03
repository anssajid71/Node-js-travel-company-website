const express = require('express');
const router = express.Router();
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware');

const {
  createBooking,
  updateBooking,
  getAllBookings,
  getBookingById,
  deleteBooking,
} = require('../controllers/booking.controller');
const {
  validateBookingCreation,
  validateBookingUpdate,
  handleValidationErrors,
} = require('../validations/booking.validation');

router.post(
  '/',
  validateBookingCreation,
  handleValidationErrors,
  jwtAuthMiddleware,
  createBooking
);

router.put(
  '/:id',
  validateBookingUpdate,
  handleValidationErrors,
  jwtAuthMiddleware,
  updateBooking
);

router.get('/', jwtAuthMiddleware, getAllBookings);

router.get('/:id', jwtAuthMiddleware, getBookingById);

router.delete('/:id', jwtAuthMiddleware, deleteBooking);

module.exports = router;

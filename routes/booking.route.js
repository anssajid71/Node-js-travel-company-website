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
  validateSignUpRequest,
  isRequestValidated,
} = require('../validations/booking.validation');

router.post(
  '/signup',
  validateSignUpRequest,
  isRequestValidated,
  createBooking
);

router.put(
  '/:id',
  
  jwtAuthMiddleware,
  updateBooking
);

router.get('/getall', jwtAuthMiddleware, getAllBookings);

router.get('/:id', jwtAuthMiddleware, getBookingById);

router.delete('/:id', jwtAuthMiddleware, deleteBooking);

module.exports = router;

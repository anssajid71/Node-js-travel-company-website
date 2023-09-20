const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/booking.controller');
const bookingMiddleware = require('../middlewares/booking.middleware');

router.post(
  '/',
  bookingMiddleware.validateBookingData,
  BookingController.createBooking
);
router.put(
  '/:id',
  bookingMiddleware.validateBookingData,
  BookingController.updateBooking
);

router.get('/', BookingController.getAllBookings);
router.get('/:id', BookingController.getBookingById);
router.post('/', BookingController.createBooking);
router.put('/:id', BookingController.updateBooking);
router.delete('/:id', BookingController.deleteBooking);

module.exports = router;

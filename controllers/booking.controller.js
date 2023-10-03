const { SUCCESS_CODE, ERROR_CODES } = require('../constants');
const { BookingService } = require('../services/index');

const createBooking = async (req, res) => {
  try {
    const newBooking = await BookingService.createBooking(req.body);
    res
      .status(201)
      .json({ message: 'Booking created successfully', newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBooking = await BookingService.updateBooking(id, req.body);
    res
      .status(SUCCESS_CODE)
      .json({ message: 'Booking updated successfully', updatedBooking });
  } catch (error) {
    console.error(error);
    res
      .status(ERROR_CODES.BAD_REQUEST)
      .json({ error: true, message: error.toString() });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await BookingService.getAllBookings();
    res.status(SUCCESS_CODE).json({ bookings });
  } catch (error) {
    console.error(error);
    res
      .status(ERROR_CODES.BAD_REQUEST)
      .json({ error: true, message: error.toString() });
  }
};

const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await BookingService.getBookingById(id);
    res.status(SUCCESS_CODE).json({ booking });
  } catch (error) {
    console.error(error);
    res
      .status(ERROR_CODES.BAD_REQUEST)
      .json({ error: true, message: error.toString() });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    await BookingService.deleteBooking(id);
    res.status(SUCCESS_CODE).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error(error);
    res
      .status(ERROR_CODES.BAD_REQUEST)
      .json({ error: true, message: error.toString() });
  }
};

module.exports = {
  createBooking,
  updateBooking,
  getAllBookings,
  getBookingById,
  deleteBooking,
};

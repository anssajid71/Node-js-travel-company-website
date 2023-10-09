const { Booking } = require('../models/index');

// Function to create a new booking
const createBooking = async (bookingData) => {
  try {
    const newBooking = await Booking.create(bookingData);
    return newBooking;
  } catch (error) {
    throw error;
  }
};

const updateBooking = async (bookingId, bookingData) => {
  try {
    const [rowsUpdated] = await Booking.update(bookingData, {
      where: { id: bookingId },
    });

    if (rowsUpdated === 0) {
      throw new Error('Booking not found or no updates were made.');
    }

    const updatedBooking = await Booking.findByPk(bookingId);
    return updatedBooking;
  } catch (error) {
    throw error;
  }
};

// Function to get all bookings
const getAllBookings = async () => {
  try {
    const bookings = await Booking.findAll();
    return bookings;
  } catch (error) {
    throw error;
  }
};

// Function to get a booking by ID
const getBookingById = async (bookingId) => {
  try {
    const booking = await Booking.findByPk(bookingId);
    return booking;
  } catch (error) {
    throw error;
  }
};

const deleteBooking = async (bookingId) => {
  try {
    const rowsDeleted = await Booking.destroy({
      where: { id: bookingId },
    });

    if (rowsDeleted === 0) {
      throw new Error('Booking not found or no deletions were made.');
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  // getBookings,
  // updateBookingStatus,

  createBooking,
  updateBooking,
  getAllBookings,
  getBookingById,
  deleteBooking,
};

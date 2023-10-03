const Booking = require('../models/Booking.model');
const { ROLE } = require('../constants/index');

const getBookings = async (req) => {
  try {
    const userRole = req.user.role;
    const { searchQuery, page_no, limit, entity_id, tabKey } = req.body;
    const fields = [
      'user_id',
      'package_id',
      'name',
      'date',
      'type',
      'total_number_of_persons',
      'pickup_location',
      'total_cost',
      'status',
      'payment_method',
      'payment_status',
      'payment_date',
      'created_at',
      'updated_at',
    ];
    let roleConditions = {};
    let roleValues = [];
    let entities = [{ entity: { $in: [ObjectId(entity_id)] } }];

    if (['SUPER_ADMIN', 'ADMIN', 'SUB_ADMIN'].includes(userRole)) {
      if (tabKey === 'subAdmins') {
        roleValues = [ROLE.SUB_ADMIN];
      } else if (tabKey === 'agents') {
        roleValues = [ROLE.AGENT];
      } else if (tabKey === 'users') {
        roleValues = [ROLE.USER];
        entities.push({ entity: entity_id, role: ROLE.USER });
      } else {
        roleValues = [ROLE.SUB_ADMIN, ROLE.AGENT, ROLE.USER];
        entities.push({ entity: entity_id, role: ROLE.USER });
      }
    }

    if (roleValues.length) {
      roleConditions = {
        role: {
          $in: roleValues,
        },
      };
    }

    let queryCondition;
    if (searchQuery) {
      queryCondition = {
        _id: { $ne: req.user._id },
        ...roleConditions,
        $and: [
          {
            $or: entities,
          },
          {
            $or: fields.map((field) => ({
              [field]: { $regex: `.*${searchQuery}.*`, $options: 'i' },
            })),
          },
        ],
      };
    } else {
      queryCondition = {
        _id: { $ne: req.user._id },
        ...roleConditions,
        $or: entities,
      };
    }

    // Get the page and limit from the body parameters
    const page = page_no || 1;
    const itemsPerPage = limit || 10;
    const skip = (page - 1) * itemsPerPage;

    const totalItems = await Booking.countDocuments(queryCondition);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const bookings = await Booking.find(queryCondition)
      .skip(skip)
      .limit(itemsPerPage)
      .select(
        '-password -passwordResetCode -tokens -__v -code -expired -image -language -logged_in -logged_out -total_chats_assigned -updatedAt'
      )
      .populate('entities')
      .sort({ updatedAt: -1 });

    return { bookings, totalPages };
  } catch (error) {
    throw error;
  }
};

const updateBookingStatus = async (bookingId, status) => {
  try {
    let booking = await Booking.findOne({ _id: bookingId });
    await Booking.updateOne(
      { _id: booking._id },
      {
        $set: {
          status: status,
        },
      }
    );
    // You can add any additional logic here if needed
  } catch (error) {
    throw error;
  }
};
// Function to create a new booking
const createBooking = async (bookingData) => {
  try {
    const newBooking = await Booking.create(bookingData);
    return newBooking;
  } catch (error) {
    throw error;
  }
};

// Function to update a booking by ID
const updateBooking = async (bookingId, bookingData) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      bookingData,
      { new: true }
    );
    return updatedBooking;
  } catch (error) {
    throw error;
  }
};

// Function to get all bookings
const getAllBookings = async () => {
  try {
    const bookings = await Booking.find();
    return bookings;
  } catch (error) {
    throw error;
  }
};

// Function to get a booking by ID
const getBookingById = async (bookingId) => {
  try {
    const booking = await Booking.findById(bookingId);
    return booking;
  } catch (error) {
    throw error;
  }
};

// Function to delete a booking by ID
const deleteBooking = async (bookingId) => {
  try {
    await Booking.findByIdAndDelete(bookingId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getBookings,
  updateBookingStatus,

  createBooking,
  updateBooking,
  getAllBookings,
  getBookingById,
  deleteBooking,
};

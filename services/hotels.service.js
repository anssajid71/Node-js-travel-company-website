const Hotel = require('../models/hotels');
const { ROLE } = require('../constants/index');

const getHotels = async (req) => {
  try {
    const userRole = req.user.role;
    const { searchQuery, page_no, limit, entity_id, tabKey } = req.body;
    const fields = ['hotelName', 'location', 'images'];
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

    const totalItems = await Hotel.countDocuments(queryCondition);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const hotels = await Hotel.find(queryCondition)
      .skip(skip)
      .limit(itemsPerPage)
      .select(
        '-password -passwordResetCode -tokens -__v -code -expired -image -language -logged_in -logged_out -total_chats_assigned -updatedAt'
      )
      .populate('entities')
      .sort({ updatedAt: -1 });

    return { hotels, totalPages };
  } catch (error) {
    throw error;
  }
};

const updateHotelStatus = async (hotelId, status) => {
  try {
    let hotel = await Hotel.findOne({ _id: hotelId });
    await Hotel.updateOne(
      { _id: hotel._id },
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
// Function to create a new hotel
const createHotel = async (hotelData) => {
  try {
    const newHotel = await Hotel.create(hotelData);
    return newHotel;
  } catch (error) {
    throw error;
  }
};

// Function to update a hotel by ID
const updateHotel = async (hotelId, hotelData) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, hotelData, {
      new: true,
    });
    return updatedHotel;
  } catch (error) {
    throw error;
  }
};

// Function to get all hotels
const getAllHotels = async () => {
  try {
    const hotels = await Hotel.find();
    return hotels;
  } catch (error) {
    throw error;
  }
};

// Function to get a hotel by ID
const getHotelById = async (hotelId) => {
  try {
    const hotel = await Hotel.findById(hotelId);
    return hotel;
  } catch (error) {
    throw error;
  }
};

// Function to delete a hotel by ID
const deleteHotel = async (hotelId) => {
  try {
    await Hotel.findByIdAndDelete(hotelId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getHotels,
  updateHotelStatus,

  createHotel,
  updateHotel,
  getAllHotels,
  getHotelById,
  deleteHotel,
};

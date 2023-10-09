const { Hotels } = require('../models/index');

const createHotel = async (hotelData) => {
  try {
    const newHotel = await Hotels.create(hotelData);
    return newHotel;
  } catch (error) {
    throw error;
  }
};

const updateHotel = async (userId, userData) => {
  try {
    const [rowsUpdated] = await Hotels.update(userData, {
      where: { id: userId },
    });

    if (rowsUpdated === 0) {
      throw new Error('User not found or no updates were made.');
    }

    const updatedHotel = await Hotels.findByPk(userId);
    return updatedHotel;
  } catch (error) {
    throw error;
  }
};

const getAllHotels = async () => {
  try {
    const hotels = await Hotels.findAll();
    return hotels;
  } catch (error) {
    throw error;
  }
};

const getHotelById = async (hotelId) => {
  try {
    const hotel = await Hotels.findByPk(hotelId);
    return hotel;
  } catch (error) {
    throw error;
  }
};

const deleteHotel = async (HotelId) => {
  try {
    const rowsDeleted = await Hotels.destroy({
      where: { id: HotelId },
    });

    if (rowsDeleted === 0) {
      throw new Error('User not found or no deletions were made.');
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createHotel,
  updateHotel,
  getAllHotels,
  getHotelById,
  deleteHotel,
};

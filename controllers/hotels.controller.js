const { SUCCESS_CODE, ERROR_CODES } = require('../constants');
const { HotelsService } = require('../services/index');

const createHotel = async (req, res) => {
  try {
    const newHotel = await HotelsService.createHotel(req.body);
    res.status(201).json({ message: 'Hotel created successfully', newHotel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedHotel = await HotelsService.updateHotel(id, req.body);
    res
      .status(SUCCESS_CODE)
      .json({ message: 'Hotel updated successfully', updatedHotel });
  } catch (error) {
    console.error(error);
    res
      .status(ERROR_CODES.BAD_REQUEST)
      .json({ error: true, message: error.toString() });
  }
};

const getAllHotels = async (req, res) => {
  try {
    const hotels = await HotelsService.getAllHotels();
    res.status(SUCCESS_CODE).json({ hotels });
  } catch (error) {
    console.error(error);
    res
      .status(ERROR_CODES.BAD_REQUEST)
      .json({ error: true, message: error.toString() });
  }
};

const getHotelById = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await HotelsService.getHotelById(id);
    res.status(SUCCESS_CODE).json({ hotel });
  } catch (error) {
    console.error(error);
    res
      .status(ERROR_CODES.BAD_REQUEST)
      .json({ error: true, message: error.toString() });
  }
};

const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;
    await HotelsService.deleteHotel(id);
    res.status(SUCCESS_CODE).json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    console.error(error);
    res
      .status(ERROR_CODES.BAD_REQUEST)
      .json({ error: true, message: error.toString() });
  }
};

module.exports = {
  createHotel,
  updateHotel,
  getAllHotels,
  getHotelById,
  deleteHotel,
};

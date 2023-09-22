const { Hotels } = require('../models/Hotels.model');
const {
  validateHotelCreation,
  validateHotelUpdate,
  handleValidationErrors,
} = require('../validations/hotels.validation');

// Create a new hotel
exports.createHotel = async (req, res) => {
  // Apply validation middleware
  validateHotelCreation.forEach((validation) => validation(req, res, () => {}));
  handleValidationErrors(req, res);

  try {
    const newHotel = await Hotels.create(req.body);
    res.status(201).json(newHotel);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create hotel' });
  }
};

// Update an existing hotel by ID
exports.updateHotel = async (req, res) => {
  const hotelId = req.params.id;
  // Apply validation middleware
  validateHotelUpdate.forEach((validation) => validation(req, res, () => {}));
  handleValidationErrors(req, res);

  try {
    const hotel = await Hotels.findByPk(hotelId);

    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    await hotel.update(req.body);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update hotel' });
  }
};

// Get all hotels
exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotels.findAll();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a hotel by ID
exports.getHotelById = async (req, res) => {
  const hotelId = req.params.id;
  try {
    const hotel = await Hotels.findByPk(hotelId);

    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a hotel by ID
exports.deleteHotel = async (req, res) => {
  const hotelId = req.params.id;
  try {
    const hotel = await Hotels.findByPk(hotelId);

    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    await hotel.destroy();
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

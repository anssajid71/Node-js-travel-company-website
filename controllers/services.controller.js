const { SUCCESS_CODE, ERROR_CODES } = require('../constants');
const { ServicerService, Services } = require('../services/index');
const { generateToken } = require('../config/generatetoken');
const { jwtExpiration } = require('../middlewares/env');

const createService = async (req, res) => {
  try {
    const newService = await ServicerService.createService(req.body);

    const token = generateToken(newService);

    // You can generate a token for the new service if needed

    res
      .status(201)
      .json({
        message: 'Service created successfully',
        token,
        expires_in: jwtExpiration,
        newService,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedService = await ServicerService.updateService(id, req.body);

    res.status(SUCCESS_CODE).json({ message: 'Service updated successfully' });
  } catch (error) {
    console.error(error);
    res
      .status(ERROR_CODES.BAD_REQUEST)
      .json({ error: true, message: error.toString() });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    await ServicerService.deleteService(id);

    res.status(SUCCESS_CODE).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error(error);
    res
      .status(ERROR_CODES.BAD_REQUEST)
      .json({ error: true, message: error.toString() });
  }
};

const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await ServicerService.getServiceById(id);

    res.status(SUCCESS_CODE).json({ service });
  } catch (error) {
    console.error(error);
    res
      .status(ERROR_CODES.BAD_REQUEST)
      .json({ error: true, message: error.toString() });
  }
};
const getAllServices = async (req, res) => {
  try {
    const newUser = await Services.getAllServices();
    res.status(201).json({ message: 'Get all Services successfully', newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createService,
  updateService,
  deleteService,
  getServiceById,
  getAllServices,
};

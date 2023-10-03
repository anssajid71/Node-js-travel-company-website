const { SUCCESS_CODE, ERROR_CODES } = require('../constants');
const { ServicesService } = require('../services/index');

const createService = async (req, res) => {
  try {
    const newService = await ServicesService.createService(req.body);
    const token = generateToken(newUser);
    res
      .status(201)
      .json({ message: 'Service created successfully', newService });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedService = await ServicesService.updateService(id, req.body);
    res
      .status(SUCCESS_CODE)
      .json({ message: 'Service updated successfully', updatedService });
  } catch (error) {
    console.error(error);
    res
      .status(ERROR_CODES.BAD_REQUEST)
      .json({ error: true, message: error.toString() });
  }
};

const getAllServices = async (req, res) => {
  try {
    const services = await ServicesService.getAllServices();
    res.status(SUCCESS_CODE).json({ services });
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
    const service = await ServicesService.getServiceById(id);
    res.status(SUCCESS_CODE).json({ service });
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
    await ServicesService.deleteService(id);
    res.status(SUCCESS_CODE).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error(error);
    res
      .status(ERROR_CODES.BAD_REQUEST)
      .json({ error: true, message: error.toString() });
  }
};

module.exports = {
  createService,
  updateService,
  getAllServices,
  getServiceById,
  deleteService,
};

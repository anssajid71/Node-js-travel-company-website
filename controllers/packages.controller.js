const { SUCCESS_CODE, ERROR_CODES } = require('../constants');
const { PackagesService } = require('../services/index');

const createPackage = async (req, res) => {
  try {
    const newPackage = await PackagesService.createPackage(req.body);
    res
      .status(201)
      .json({ message: 'Package created successfully', newPackage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPackage = await PackagesService.updatePackage(id, req.body);
    res
      .status(SUCCESS_CODE)
      .json({ message: 'Package updated successfully', updatedPackage });
  } catch (error) {
    console.error(error);
    res
      .status(ERROR_CODES.BAD_REQUEST)
      .json({ error: true, message: error.toString() });
  }
};

const getAllPackages = async (req, res) => {
  try {
    const packages = await PackagesService.getAllPackages();
    res.status(SUCCESS_CODE).json({ packages });
  } catch (error) {
    console.error(error);
    res
      .status(ERROR_CODES.BAD_REQUEST)
      .json({ error: true, message: error.toString() });
  }
};

const getPackageById = async (req, res) => {
  try {
    const { id } = req.params;
    const package = await PackagesService.getPackageById(id);
    res.status(SUCCESS_CODE).json({ package });
  } catch (error) {
    console.error(error);
    res
      .status(ERROR_CODES.BAD_REQUEST)
      .json({ error: true, message: error.toString() });
  }
};

const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;
    await PackagesService.deletePackage(id);
    res.status(SUCCESS_CODE).json({ message: 'Package deleted successfully' });
  } catch (error) {
    console.error(error);
    res
      .status(ERROR_CODES.BAD_REQUEST)
      .json({ error: true, message: error.toString() });
  }
};

module.exports = {
  createPackage,
  updatePackage,
  getAllPackages,
  getPackageById,
  deletePackage,
};

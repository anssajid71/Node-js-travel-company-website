const { SUCCESS_CODE, ERROR_CODES } = require('../constants');
const { CompaniesService } = require('../services/index');
const { generateToken } = require('../config/generatetoken');

const createCompany = async (req, res) => {
  try {
    const newCompany = await CompaniesService.createCompany(req.body);
    const token = generateToken(newCompany);

    res
      .status(201)
      .json({ message: 'Company created successfully', token, newCompany  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCompany = await CompaniesService.updateCompany(id, req.body);
    res
      .status(SUCCESS_CODE)
      .json({ message: 'Company updated successfully', updatedCompany });
  } catch (error) {
    console.error(error);
    res
      .status(ERROR_CODES.BAD_REQUEST)
      .json({ error: true, message: error.toString() });
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const companies = await CompaniesService.getAllCompanies();
    res.status(SUCCESS_CODE).json({ companies });
  } catch (error) {
    console.error(error);
    res
      .status(ERROR_CODES.BAD_REQUEST)
      .json({ error: true, message: error.toString() });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await CompaniesService.getCompanyById(id);
    res.status(SUCCESS_CODE).json({ company });
  } catch (error) {
    console.error(error);
    res
      .status(ERROR_CODES.BAD_REQUEST)
      .json({ error: true, message: error.toString() });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    await CompaniesService.deleteCompany(id);
    res.status(SUCCESS_CODE).json({ message: 'Company deleted successfully' });
  } catch (error) {
    console.error(error);
    res
      .status(ERROR_CODES.BAD_REQUEST)
      .json({ error: true, message: error.toString() });
  }
};

module.exports = {
  createCompany,
  updateCompany,
  getAllCompanies,
  getCompanyById,
  deleteCompany,
};

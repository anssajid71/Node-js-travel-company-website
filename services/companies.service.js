const { Companies } = require('../models/index');

// Function to create a new company
const createCompany = async (companyData) => {
  try {
    const newCompany = await Companies.create(companyData);
    return newCompany;
  } catch (error) {
    throw error;
  }
};

// Function to update a company by ID
const updateCompany = async (companyId, companyData) => {
  try {
    const updatedCompany = await Companies.findByIdAndUpdate(
      companyId,
      companyData,
      { new: true }
    );
    return updatedCompany;
  } catch (error) {
    throw error;
  }
};

// Function to get all companies
const getAllCompanies = async () => {
  try {
    const companies = await Companies.find();
    return companies;
  } catch (error) {
    throw error;
  }
};

// Function to get a company by ID
const getCompanyById = async (companyId) => {
  try {
    const company = await Companies.findById(companyId);
    return company;
  } catch (error) {
    throw error;
  }
};

// Function to delete a company by ID
const deleteCompany = async (companyId) => {
  try {
    await Companies.findByIdAndDelete(companyId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  // getCompanies,
  // updateCompanyStatus,

  createCompany,
  updateCompany,
  getAllCompanies,
  getCompanyById,
  deleteCompany,
};

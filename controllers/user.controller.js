const { Companies } = require('../models');

// Controller to retrieve all companies
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Companies.findAll();
    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ error: 'Unable to fetch companies' });
  }
};

// Controller to retrieve a specific company by ID
exports.getCompanyById = async (req, res) => {
  const { id } = req.params;
  try {
    const company = await Companies.findByPk(id);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.json(company);
  } catch (error) {
    console.error('Error fetching company by ID:', error);
    res.status(500).json({ error: 'Unable to fetch company' });
  }
};

// Controller to create a new company
exports.createCompany = async (req, res) => {
  const { name, logo, phone_number } = req.body;
  try {
    const company = await Companies.create({
      name,
      logo,
      phone_number,
    });
    res.status(201).json(company);
  } catch (error) {
    console.error('Error creating company:', error);
    res.status(500).json({ error: 'Unable to create company' });
  }
};

// Controller to update a specific company by ID
exports.updateCompany = async (req, res) => {
  const { id } = req.params;
  const { name, logo, phone_number } = req.body;
  try {
    const company = await Companies.findByPk(id);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    company.name = name;
    company.logo = logo;
    company.phone_number = phone_number;
    await company.save();
    res.json(company);
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(500).json({ error: 'Unable to update company' });
  }
};

// Controller to delete a specific company by ID
exports.deleteCompany = async (req, res) => {
  const { id } = req.params;
  try {
    const company = await Companies.findByPk(id);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    await company.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting company:', error);
    res.status(500).json({ error: 'Unable to delete company' });
  }
};

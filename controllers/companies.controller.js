const { Companies } = require('../models/Companies.model');
const {
  validateCompanyCreation,
  validateCompanyUpdate,
  handleValidationErrors,
} = require('../validations/companies.validation');

// Create a new company
exports.createCompany = async (req, res) => {
  // Apply validation middleware
  validateCompanyCreation.forEach((validation) =>
    validation(req, res, () => {})
  );
  handleValidationErrors(req, res);

  try {
    const newCompany = await Companies.create(req.body);
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create company' });
  }
};

// Update an existing company by ID
exports.updateCompany = async (req, res) => {
  const companyId = req.params.id;
  // Apply validation middleware
  validateCompanyUpdate.forEach((validation) => validation(req, res, () => {}));
  handleValidationErrors(req, res);

  try {
    const company = await Companies.findByPk(companyId);

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    await company.update(req.body);
    res.status(200).json(company);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update company' });
  }
};

// Get all companies
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Companies.findAll();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a company by ID
exports.getCompanyById = async (req, res) => {
  const companyId = req.params.id;
  try {
    const company = await Companies.findByPk(companyId);

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a company by ID
exports.deleteCompany = async (req, res) => {
  const companyId = req.params.id;
  try {
    const company = await Companies.findByPk(companyId);

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    await company.destroy();
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

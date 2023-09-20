// packages.controller.js

const { Packages } = require('../models'); // Assuming you have a Packages model

// Create a new package
exports.createPackage = async (req, res) => {
  try {
    const newPackage = await Packages.create(req.body);
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create package' });
  }
};

// Update an existing package by ID
exports.updatePackage = async (req, res) => {
  const packageId = req.params.id;
  try {
    const package = await Packages.findByPk(packageId);

    if (!package) {
      return res.status(404).json({ error: 'Package not found' });
    }

    await package.update(req.body);
    res.status(200).json(package);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update package' });
  }
};

// Get all packages
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Packages.findAll();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a package by ID
exports.getPackageById = async (req, res) => {
  const packageId = req.params.id;
  try {
    const package = await Packages.findByPk(packageId);

    if (!package) {
      return res.status(404).json({ error: 'Package not found' });
    }

    res.status(200).json(package);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a package by ID
exports.deletePackage = async (req, res) => {
  const packageId = req.params.id;
  try {
    const package = await Packages.findByPk(packageId);

    if (!package) {
      return res.status(404).json({ error: 'Package not found' });
    }

    await package.destroy();
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

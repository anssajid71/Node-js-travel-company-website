const { Packages } = require('../models/index');

const createPackage = async (packageData) => {
  try {
    const newPackage = await Packages.create(packageData);
    return newPackage;
  } catch (error) {
    throw error;
  }
};

const updatePackage = async (packageId, packageData) => {
  try {
    const [rowsUpdated] = await Packages.update(packageData, {
      where: { id: packageId },
    });

    if (rowsUpdated === 0) {
      throw new Error('Package not found or no updates were made.');
    }

    const updatedPackage = await Packages.findByPk(packageId);
    return updatedPackage;
  } catch (error) {
    throw error;
  }
};

const deletePackage = async (packageId) => {
  try {
    const rowsDeleted = await Packages.destroy({
      where: { id: packageId },
    });

    if (rowsDeleted === 0) {
      throw new Error('Package not found or no deletions were made.');
    }
  } catch (error) {
    throw error;
  }
};

const getPackageById = async (packageId) => {
  try {
    console.log('packageId', packageId);
    const package = await Packages.findByPk(packageId);
    return package;
  } catch (error) {
    throw error;
  }
};
const getAllPackages = async () => {
  try {
    const packages = await Packages.findAll();
    return packages;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createPackage,
  updatePackage,
  deletePackage,
  getPackageById,
  getAllPackages
};

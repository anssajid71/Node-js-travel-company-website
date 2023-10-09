const { Services } = require('../models/index');

const createService = async (serviceData) => {
  try {
    const newService = await Services.create(serviceData);
    return newService;
  } catch (error) {
    throw error;
  }
};
const updateService = async (serviceId, serviceData) => {
  try {
    const [rowsUpdated] = await Services.update(serviceData, {
      where: { id: serviceId },
    });

    if (rowsUpdated === 0) {
      throw new Error('Service not found or no updates were made.');
    }

    const updatedService = await Services.findByPk(serviceId);
    return updatedService;
  } catch (error) {
    throw error;
  }
};

const deleteService = async (serviceId) => {
  try {
    const rowsDeleted = await Services.destroy({
      where: { id: serviceId },
    });

    if (rowsDeleted === 0) {
      throw new Error('Service not found or no deletions were made.');
    }
  } catch (error) {
    throw error;
  }
};

const getServiceById = async (serviceId) => {
  try {
    const Service = await Services.findByPk(serviceId);
    return Service;
  } catch (error) {
    throw error;
  }
};
const getAllServices = async () => {
  try {
    const users = await Services.findAll();
    return users;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createService,
  updateService,
  deleteService,
  getServiceById,
  getAllServices
};

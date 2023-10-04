const Service = require('../models/services');
const { ROLE } = require('../constants/index');

// Function to create a new service
const createService = async (serviceData) => {
  try {
    const newService = await Services.create(serviceData);
    return newService;
  } catch (error) {
    throw error;
  }
};

// Function to update a service by ID
const updateService = async (serviceId, serviceData) => {
  try {
    const updatedService = await Services.findByIdAndUpdate(
      serviceId,
      serviceData,
      {
        new: true,
      }
    );
    return updatedService;
  } catch (error) {
    throw error;
  }
};

// Function to get all services
const getAllServices = async () => {
  try {
    const services = await Services.find();
    return services;
  } catch (error) {
    throw error;
  }
};

// Function to get a service by ID
const getServiceById = async (serviceId) => {
  try {
    const service = await Services.findById(serviceId);
    return service;
  } catch (error) {
    throw error;
  }
};

// Function to delete a service by ID
const deleteService = async (serviceId) => {
  try {
    await Services.findByIdAndDelete(serviceId);
  } catch (error) {
    throw error;
  }
};

const getServices = async (req) => {
  try {
    const userRole = req.user.role;
    const { searchQuery, page_no, limit, entity_id, tabKey } = req.body;
    const fields = ['package_id', 'service_Name'];
    let roleConditions = {};
    let roleValues = [];
    let entities = [{ entity: { $in: [ObjectId(entity_id)] } }];

    if (['SUPER_ADMIN', 'ADMIN', 'SUB_ADMIN'].includes(userRole)) {
      if (tabKey === 'subAdmins') {
        roleValues = [ROLE.SUB_ADMIN];
      } else if (tabKey === 'agents') {
        roleValues = [ROLE.AGENT];
      } else if (tabKey === 'users') {
        roleValues = [ROLE.USER];
        entities.push({ entity: entity_id, role: ROLE.USER });
      } else {
        roleValues = [ROLE.SUB_ADMIN, ROLE.AGENT, ROLE.USER];
        entities.push({ entity: entity_id, role: ROLE.USER });
      }
    }

    if (roleValues.length) {
      roleConditions = {
        role: {
          $in: roleValues,
        },
      };
    }

    let queryCondition;
    if (searchQuery) {
      queryCondition = {
        _id: { $ne: req.user._id },
        ...roleConditions,
        $and: [
          {
            $or: entities,
          },
          {
            $or: fields.map((field) => ({
              [field]: { $regex: `.*${searchQuery}.*`, $options: 'i' },
            })),
          },
        ],
      };
    } else {
      queryCondition = {
        _id: { $ne: req.user._id },
        ...roleConditions,
        $or: entities,
      };
    }

    const page = page_no || 1;
    const itemsPerPage = limit || 10;
    const skip = (page - 1) * itemsPerPage;

    const totalItems = await Service.countDocuments(queryCondition);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const services = await Service.find(queryCondition)
      .skip(skip)
      .limit(itemsPerPage)
      .select(
        '-password -passwordResetCode -tokens -__v -code -expired -image -language -logged_in -logged_out -total_chats_assigned -updatedAt'
      )
      .populate('entities')
      .sort({ updatedAt: -1 });

    return { services, totalPages };
  } catch (error) {
    throw error;
  }
};

const updateServiceStatus = async (serviceId, status) => {
  try {
    let service = await Service.findOne({ _id: serviceId });
    await Service.updateOne(
      { _id: service._id },
      {
        $set: {
          status: status,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getServices,
  updateServiceStatus,

  createService,
  updateService,
  getAllServices,
  getServiceById,
  deleteService,
};

const Package = require('../models/Packages.model');
const { ROLE } = require('../constants/index');

const getPackages = async (req) => {
  try {
    const userRole = req.user.role;
    const { searchQuery, page_no, limit, entity_id, tabKey } = req.body;
    const fields = [
      'name',
      'description',
      'price',
      'start_date',
      'end_date',
      'total_days',
      'type',
      'images',
      'available_seats',
      'location',
      'created_at',
      'updated_at',
    ];
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

    // Get the page and limit from the body parameters
    const page = page_no || 1;
    const itemsPerPage = limit || 10;
    const skip = (page - 1) * itemsPerPage;

    const totalItems = await Package.countDocuments(queryCondition);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const packages = await Package.find(queryCondition)
      .skip(skip)
      .limit(itemsPerPage)
      .select(
        '-password -passwordResetCode -tokens -__v -code -expired -image -language -logged_in -logged_out -total_chats_assigned -updatedAt'
      )
      .populate('entities')
      .sort({ updatedAt: -1 });

    return { packages, totalPages };
  } catch (error) {
    throw error;
  }
};

const updatePackageStatus = async (packageId, status) => {
  try {
    let package = await Package.findOne({ _id: packageId });
    await Package.updateOne(
      { _id: package._id },
      {
        $set: {
          status: status,
        },
      }
    );
    // You can add any additional logic here if needed
  } catch (error) {
    throw error;
  }
};

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
    const updatedPackage = await Packages.findByIdAndUpdate(
      packageId,
      packageData,
      {
        new: true,
      }
    );
    return updatedPackage;
  } catch (error) {
    throw error;
  }
};

const getAllPackages = async () => {
  try {
    const packages = await Packages.find();
    return packages;
  } catch (error) {
    throw error;
  }
};

const getPackageById = async (packageId) => {
  try {
    const package = await Packages.findById(packageId);
    return package;
  } catch (error) {
    throw error;
  }
};

const deletePackage = async (packageId) => {
  try {
    await Packages.findByIdAndDelete(packageId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getPackages,
  updatePackageStatus,

  createPackage,
  updatePackage,
  getAllPackages,
  getPackageById,
  deletePackage,
};

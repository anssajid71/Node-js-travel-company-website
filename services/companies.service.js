const Company = require('../models/Companies.model');
const { ROLE } = require('../constants/index');

const getCompanies = async (req) => {
  try {
    const userRole = req.user.role;
    const { searchQuery, page_no, limit, entity_id, tabKey } = req.body;
    const fields = ['user_id', 'companyName', 'logo', 'location'];
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

    const totalItems = await Company.countDocuments(queryCondition);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const companies = await Company.find(queryCondition)
      .skip(skip)
      .limit(itemsPerPage)
      .select(
        '-password -passwordResetCode -tokens -__v -code -expired -image -language -logged_in -logged_out -total_chats_assigned -updatedAt'
      )
      .populate('entities')
      .sort({ updatedAt: -1 });

    return { companies, totalPages };
  } catch (error) {
    throw error;
  }
};

const updateCompanyStatus = async (companyId, status) => {
  try {
    let company = await Company.findOne({ _id: companyId });
    await Company.updateOne(
      { _id: company._id },
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
// Function to create a new company
const createCompany = async (companyData) => {
  try {
    const newCompany = await Company.create(companyData);
    return newCompany;
  } catch (error) {
    throw error;
  }
};

// Function to update a company by ID
const updateCompany = async (companyId, companyData) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(
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
    const companies = await Company.find();
    return companies;
  } catch (error) {
    throw error;
  }
};

// Function to get a company by ID
const getCompanyById = async (companyId) => {
  try {
    const company = await Company.findById(companyId);
    return company;
  } catch (error) {
    throw error;
  }
};

// Function to delete a company by ID
const deleteCompany = async (companyId) => {
  try {
    await Company.findByIdAndDelete(companyId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getCompanies,
  updateCompanyStatus,

  createCompany,
  updateCompany,
  getAllCompanies,
  getCompanyById,
  deleteCompany,
};

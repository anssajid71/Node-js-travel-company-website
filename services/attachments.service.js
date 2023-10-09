const { Attachments } = require('../models/index');

// Function to create a new attachment
const createAttachment = async (attachmentData) => {
  try {
    const newAttachment = await Attachments.create(attachmentData);
    return newAttachment;
  } catch (error) {
    throw error;
  }
};

// Function to update an attachment by ID
const updateAttachment = async (attachmentId, attachmentData) => {
  try {
    const updatedAttachment = await Attachments.findByPk(attachmentId);

    return updatedAttachment;
  } catch (error) {
    throw error;
  }
};

// Function to get all attachments
const getAllAttachments = async () => {
  try {
    const attachments = await Attachments.findAll();
    return attachments;
  } catch (error) {
    throw error;
  }
};

// Function to get an attachment by ID
const getAttachmentById = async (attachmentId) => {
  try {
    const attachment = await Attachments.findByPk(attachmentId);
    return attachment;
  } catch (error) {
    throw error;
  }
};

// Function to delete an attachment by ID
const deleteAttachment = async (attachmentId) => {
  try {
    const rowsDeleted = await Attachments.destroy({
      where: { id: attachmentId },
    });
    if (rowsDeleted === 0) {
      throw new Error('User not found or no deletions were made.');
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createAttachment,
  updateAttachment,
  getAllAttachments,
  getAttachmentById,
  deleteAttachment,
};

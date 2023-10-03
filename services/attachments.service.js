const { Attachment } = require('../models/Attachments.model');

// Function to create a new attachment
const createAttachment = async (attachmentData) => {
  try {
    const newAttachment = await Attachment.create(attachmentData);
    return newAttachment;
  } catch (error) {
    throw error;
  }
};

// Function to update an attachment by ID
const updateAttachment = async (attachmentId, attachmentData) => {
  try {
    const updatedAttachment = await Attachment.findByIdAndUpdate(
      attachmentId,
      attachmentData,
      { new: true }
    );
    return updatedAttachment;
  } catch (error) {
    throw error;
  }
};

// Function to get all attachments
const getAllAttachments = async () => {
  try {
    const attachments = await Attachment.find();
    return attachments;
  } catch (error) {
    throw error;
  }
};

// Function to get an attachment by ID
const getAttachmentById = async (attachmentId) => {
  try {
    const attachment = await Attachment.findById(attachmentId);
    return attachment;
  } catch (error) {
    throw error;
  }
};

// Function to delete an attachment by ID
const deleteAttachment = async (attachmentId) => {
  try {
    await Attachment.findByIdAndDelete(attachmentId);
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

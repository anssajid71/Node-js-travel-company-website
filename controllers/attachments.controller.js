const { SUCCESS_CODE, ERROR_CODES } = require('../constants');
const { AttachmentService } = require('../services/index');

const createAttachment = async (req, res) => {
  try {
    const newAttachment = await AttachmentService.createAttachment(req.body);
    res
      .status(201)
      .json({ message: 'Attachment created successfully', newAttachment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateAttachment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAttachment = await AttachmentService.updateAttachment(
      id,
      req.body
    );
    res
      .status(SUCCESS_CODE)
      .json({ message: 'Attachment updated successfully', updatedAttachment });
  } catch (error) {
    console.error(error);
    res
      .status(ERROR_CODES.BAD_REQUEST)
      .json({ error: true, message: error.toString() });
  }
};

const getAllAttachments = async (req, res) => {
  try {
    const attachments = await AttachmentService.getAllAttachments();
    res.status(SUCCESS_CODE).json({ attachments });
  } catch (error) {
    console.error(error);
    res
      .status(ERROR_CODES.BAD_REQUEST)
      .json({ error: true, message: error.toString() });
  }
};

const getAttachmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const attachment = await AttachmentService.getAttachmentById(id);
    res.status(SUCCESS_CODE).json({ attachment });
  } catch (error) {
    console.error(error);
    res
      .status(ERROR_CODES.BAD_REQUEST)
      .json({ error: true, message: error.toString() });
  }
};

const deleteAttachment = async (req, res) => {
  try {
    const { id } = req.params;
    await AttachmentService.deleteAttachment(id);
    res
      .status(SUCCESS_CODE)
      .json({ message: 'Attachment deleted successfully' });
  } catch (error) {
    console.error(error);
    res
      .status(ERROR_CODES.BAD_REQUEST)
      .json({ error: true, message: error.toString() });
  }
};

module.exports = {
  createAttachment,
  updateAttachment,
  getAllAttachments,
  getAttachmentById,
  deleteAttachment,
};

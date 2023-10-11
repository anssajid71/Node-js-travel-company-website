const { SUCCESS_CODE, ERROR_CODES } = require('../constants');
const { AttachmentsService } = require('../services/index');
const { generateToken } = require('../config/generatetoken');
const { jwtExpiration } = require('../middlewares/env');

const createAttachment = async (req, res) => {
  try {
    const newAttachment = await AttachmentsService.createAttachment(req.body);
    const token = generateToken(newAttachment);

    res.status(201).json({
      message: 'Attachment created successfully',
      token,
      expires_in: jwtExpiration,
      newAttachment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateAttachment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAttachment = await AttachmentsService.updateAttachment(
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
    const attachments = await AttachmentsService.getAllAttachments();
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
    const attachment = await AttachmentsService.getAttachmentById(id);
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
    await AttachmentsService.deleteAttachment(id);
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

const { Attachment } = require('../models/Attachments.model');
const {
  validateAttachmentCreation,
  validateAttachmentUpdate,
  handleValidationErrors,
} = require('../validations/attachments.validation');

// Create a new attachment
exports.createAttachment = async (req, res) => {
  // Apply validation middleware
  validateAttachmentCreation.forEach((validation) =>
    validation(req, res, () => {})
  );
  handleValidationErrors(req, res);

  try {
    const newAttachment = await Attachment.create(req.body);
    res.status(201).json(newAttachment);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create attachment' });
  }
};

// Update an existing attachment by ID
exports.updateAttachment = async (req, res) => {
  const attachmentId = req.params.id;
  // Apply validation middleware
  validateAttachmentUpdate.forEach((validation) =>
    validation(req, res, () => {})
  );
  handleValidationErrors(req, res);

  try {
    const attachment = await Attachment.findByPk(attachmentId);

    if (!attachment) {
      return res.status(404).json({ error: 'Attachment not found' });
    }

    await attachment.update(req.body);
    res.status(200).json(attachment);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update attachment' });
  }
};

// Get all attachments
exports.getAllAttachments = async (req, res) => {
  try {
    const attachments = await Attachment.findAll();
    res.status(200).json(attachments);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get an attachment by ID
exports.getAttachmentById = async (req, res) => {
  const attachmentId = req.params.id;
  try {
    const attachment = await Attachment.findByPk(attachmentId);

    if (!attachment) {
      return res.status(404).json({ error: 'Attachment not found' });
    }

    res.status(200).json(attachment);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete an attachment by ID
exports.deleteAttachment = async (req, res) => {
  const attachmentId = req.params.id;
  try {
    const attachment = await Attachment.findByPk(attachmentId);

    if (!attachment) {
      return res.status(404).json({ error: 'Attachment not found' });
    }

    await attachment.destroy();
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

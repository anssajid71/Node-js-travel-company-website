const express = require('express');
const router = express.Router();
const AttachmentsController = require('../controllers/attachments.controller');
const {
  validateAttachmentCreation,
  validateAttachmentUpdate,
  handleValidationErrors,
} = require('../validations/attachments.validation');

// Create a new attachment
router.post(
  '/',
  validateAttachmentCreation,
  handleValidationErrors,
  AttachmentsController.createAttachment
);

// Update an attachment by ID
router.put(
  '/:id',
  validateAttachmentUpdate,
  handleValidationErrors,
  AttachmentsController.updateAttachment
);

// Get all attachments
router.get('/', AttachmentsController.getAllAttachments);

// Get an attachment by ID
router.get('/:id', AttachmentsController.getAttachmentById);

// Delete an attachment by ID
router.delete('/:id', AttachmentsController.deleteAttachment);

module.exports = router;

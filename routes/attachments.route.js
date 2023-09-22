const express = require('express');
const router = express.Router();
const AttachmentController = require('../controllers/attachments.controller');

// Create a new attachment
router.post('/', AttachmentController.createAttachment);

// Update an attachment by ID
router.put('/:id', AttachmentController.updateAttachment);

// Get all attachments
router.get('/', AttachmentController.getAllAttachments);

// Get an attachment by ID
router.get('/:id', AttachmentController.getAttachmentById);

// Delete an attachment by ID
router.delete('/:id', AttachmentController.deleteAttachment);

module.exports = router;

const express = require('express');
const router = express.Router();
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware');

const {
  createAttachment,
  updateAttachment,
  getAllAttachments,
  getAttachmentById,
  deleteAttachment,
} = require('../controllers/attachments.controller');
const {
  validateAttachmentCreation,
  validateAttachmentUpdate,
  handleValidationErrors,
} = require('../validations/attachments.validation');

router.post(
  '/',
  validateAttachmentCreation,
  handleValidationErrors,
  jwtAuthMiddleware,
  createAttachment
);

router.put(
  '/:id',
  validateAttachmentUpdate,
  handleValidationErrors,
  jwtAuthMiddleware,
  updateAttachment
);

router.get('/', jwtAuthMiddleware, getAllAttachments);

router.get('/:id', jwtAuthMiddleware, getAttachmentById);

router.delete('/:id', jwtAuthMiddleware, deleteAttachment);

module.exports = router;

const express = require('express');
const router = express.Router();
const AttachmentController = require('../controllers/attachment.controller');
const attachmentMiddleware = require('../middlewares/attachment.middleware');

router.post(
  '/',
  attachmentMiddleware.validateAttachmentData,
  AttachmentController.createAttachment
);
router.put(
  '/:id',
  attachmentMiddleware.validateAttachmentData,
  AttachmentController.updateAttachment
);

router.get('/', AttachmentController.getAllAttachments);
router.get('/:id', AttachmentController.getAttachmentById);
router.post('/', AttachmentController.createAttachment);
router.put('/:id', AttachmentController.updateAttachment);
router.delete('/:id', AttachmentController.deleteAttachment);

module.exports = router;

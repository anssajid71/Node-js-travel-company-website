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
  validateSignUpRequest,
  isRequestValidated,
} = require('../validations/attachments.validation');

router.post(
  '/signup',
  validateSignUpRequest,
  isRequestValidated,
  createAttachment
);

router.put(
  '/:id',
 
  updateAttachment
);

router.get('/getall', jwtAuthMiddleware, getAllAttachments);

router.get('/:id', jwtAuthMiddleware, getAttachmentById);

router.delete('/:id', jwtAuthMiddleware, deleteAttachment);

module.exports = router;

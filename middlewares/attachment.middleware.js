function validateAttachmentData(req, res, next) {
  const { attachment_id, attachment_type, attachment_uRL } = req.body;

  if (!attachment_id || !attachment_type || !attachment_uRL) {
    return res
      .status(400)
      .json({ error: 'Please provide valid attachment data.' });
  }

  next();
}

module.exports = {
  validateAttachmentData,
};

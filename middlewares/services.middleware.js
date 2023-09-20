const validateServiceData = (req, res, next) => {
  const { service_name, package_id, id } = req.body;

  if (!service_name || !package_id || !id) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  next();
};

module.exports = {
  validateServiceData,
};

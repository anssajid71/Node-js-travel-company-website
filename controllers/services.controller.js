const { Services } = require('../models'); // Assuming you have a Services model

// Create a new service
exports.createService = async (req, res) => {
  try {
    const newService = await Services.create(req.body);
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create service' });
  }
};

// Update an existing service by ID
exports.updateService = async (req, res) => {
  const serviceId = req.params.id;
  try {
    const service = await Services.findByPk(serviceId);

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    await service.update(req.body);
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update service' });
  }
};

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Services.findAll();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a service by ID
exports.getServiceById = async (req, res) => {
  const serviceId = req.params.id;
  try {
    const service = await Services.findByPk(serviceId);

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a service by ID
exports.deleteService = async (req, res) => {
  const serviceId = req.params.id;
  try {
    const service = await Services.findByPk(serviceId);

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    await service.destroy();
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

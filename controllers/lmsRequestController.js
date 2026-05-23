const LmsRequest = require('../models/LmsRequest');

const lmsRequestController = {
  createRequest: async (req, res) => {
    try {
      const { name, email, phone, whatsapp, message, tenantDomain, tenantName } = req.body;

      if (!name?.trim() || !email?.trim() || !phone?.trim() || !whatsapp?.trim() || !message?.trim()) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Please enter a valid email address' });
      }

      const request = await LmsRequest.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        whatsapp: whatsapp.trim(),
        message: message.trim(),
        tenantDomain: tenantDomain?.trim() || '',
        tenantName: tenantName?.trim() || ''
      });

      res.status(201).json({
        message: 'Request submitted successfully',
        request: {
          id: request._id,
          createdAt: request.createdAt
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  getAllRequests: async (req, res) => {
    try {
      const { status } = req.query;
      const filter = status ? { status } : {};

      const requests = await LmsRequest.find(filter).sort({ createdAt: -1 });
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  updateRequestStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['pending', 'contacted', 'closed'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }

      const request = await LmsRequest.findByIdAndUpdate(id, { status }, { new: true });

      if (!request) {
        return res.status(404).json({ message: 'Request not found' });
      }

      res.json(request);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = lmsRequestController;
